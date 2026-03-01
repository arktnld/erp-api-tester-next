# Hybrid RAG Search Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace pure vector search with hybrid BM25 + vector search merged via Reciprocal Rank Fusion (RRF) to fix cases where keyword-exact queries ("como puxar títulos") return irrelevant results.

**Architecture:** Run two parallel SQL queries per retrieval — a pgvector cosine similarity search and a PostgreSQL full-text `tsvector` search — then merge the ranked results using the RRF formula `score = Σ 1/(k + rank)` (k=60). No schema changes, no new dependencies: PostgreSQL already supports `to_tsvector`/`plainto_tsquery` without an explicit column.

**Tech Stack:** PostgreSQL tsvector/tsquery (`'simple'` dictionary), pgvector `<=>` operator, Prisma `$queryRaw`, TypeScript, Vitest

---

### Task 1: Add RRF utility function + unit tests

**Files:**
- Modify: `apps/web/lib/utils.ts`
- Modify: `apps/web/lib/utils.test.ts`

**Step 1: Write the failing tests**

Add to `apps/web/lib/utils.test.ts`:

```ts
import { reciprocalRankFusion } from './utils'

describe('reciprocalRankFusion', () => {
  it('returns empty array for empty inputs', () => {
    expect(reciprocalRankFusion([], [])).toEqual([])
  })

  it('merges two disjoint result sets by combined score', () => {
    const vecResults = [{ text: 'A' }, { text: 'B' }]
    const bm25Results = [{ text: 'C' }, { text: 'D' }]
    const merged = reciprocalRankFusion(vecResults, bm25Results)
    // Each appears once; A and C tied at rank 1 in their list → score 1/61
    expect(merged).toHaveLength(4)
    // A appears in vecResults at rank 1: score = 1/(60+1) ≈ 0.01639
    // C appears in bm25Results at rank 1: same score
    // All four docs have the same total score — order is stable insertion order
    expect(merged.map(r => r.text)).toEqual(['A', 'C', 'B', 'D'])
  })

  it('boosts docs that appear in both result sets', () => {
    const vecResults = [{ text: 'A' }, { text: 'B' }]
    const bm25Results = [{ text: 'B' }, { text: 'C' }]
    const merged = reciprocalRankFusion(vecResults, bm25Results)
    // B appears in both → score = 1/61 + 1/61 ≈ 0.0328
    // A rank 1 vec only → 1/61; C rank 2 bm25 only → 1/62
    expect(merged[0].text).toBe('B')
  })

  it('respects topK limit', () => {
    const docs = Array.from({ length: 10 }, (_, i) => ({ text: `doc${i}` }))
    const merged = reciprocalRankFusion(docs, [], 3)
    expect(merged).toHaveLength(3)
  })
})
```

**Step 2: Run tests to verify they fail**

```bash
cd /home/arktnld/projects/erp-api-tester-next
pnpm --filter @erp/web test -- --run 2>&1 | grep -A 5 "reciprocalRankFusion"
```

Expected: FAIL — `reciprocalRankFusion is not a function`

**Step 3: Implement the function**

Add to the bottom of `apps/web/lib/utils.ts`:

```ts
/**
 * Reciprocal Rank Fusion merges multiple ranked result lists.
 * Standard k=60 constant prevents high ranks from dominating.
 * Docs appearing in multiple lists receive additive score boosts.
 */
export function reciprocalRankFusion<T extends { text: string }>(
  ...lists: (T[] | [T[], T[], number])[]
): T[]

export function reciprocalRankFusion<T extends { text: string }>(
  list1: T[],
  list2: T[],
  topK = 20
): T[] {
  const k = 60
  const scores = new Map<string, { item: T; score: number }>()

  for (const list of [list1, list2]) {
    list.forEach((item, idx) => {
      const existing = scores.get(item.text)
      const add = 1 / (k + idx + 1)
      if (existing) {
        existing.score += add
      } else {
        scores.set(item.text, { item, score: add })
      }
    })
  }

  return Array.from(scores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(v => v.item)
}
```

**Step 4: Run tests to verify they pass**

```bash
cd /home/arktnld/projects/erp-api-tester-next
pnpm --filter @erp/web test -- --run 2>&1 | tail -20
```

Expected: all tests pass (including existing 7 tests)

**Step 5: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/rag-debug
git add apps/web/lib/utils.ts apps/web/lib/utils.test.ts
git commit -m "feat: add reciprocalRankFusion utility for hybrid RAG"
```

---

### Task 2: Update retrieveContext with hybrid search

**Files:**
- Modify: `apps/web/app/actions/collections.ts:122-165`

**Context:** The current `retrieveContext` runs a single vector similarity query with a 0.55 cosine distance threshold. The fix: run a second full-text query in parallel, merge results with RRF, then apply the same threshold only to the vector results.

**Step 1: No test needed** (DB-dependent function; manual verification is the test)

**Step 2: Replace the body of retrieveContext from line 146 onward**

Current code (lines 146-165):
```ts
const queryVec = await embedQuery(question, storedProvider, embeddingKey)

const SIMILARITY_THRESHOLD = 0.55

const rows = await prisma.$queryRaw<{ text: string; score: number }[]>`
  SELECT text, (embedding <=> ${JSON.stringify(queryVec)}::vector) as score
  FROM "EmbeddingChunk"
  WHERE "collectionId" = ${collectionId}
    AND (embedding <=> ${JSON.stringify(queryVec)}::vector) < ${SIMILARITY_THRESHOLD}
  ORDER BY embedding <=> ${JSON.stringify(queryVec)}::vector
  LIMIT ${topK}
`

if (rows.length === 0) {
  return { context: '', chunks: [], mode: 'skipped' }
}

const chunks = rows.map(r => `[${(1 - r.score).toFixed(2)}] ${r.text}`)
return { context: chunks.map(c => c.replace(/^\[[^\]]+\] /, '')).join('\n\n'), chunks, mode: 'semantic' }
```

Replace with:
```ts
const queryVec = await embedQuery(question, storedProvider, embeddingKey)

const SIMILARITY_THRESHOLD = 0.55
const FETCH_K = topK * 3 // fetch more candidates, RRF will rerank

// Run both searches in parallel
const [vecRows, bm25Rows] = await Promise.all([
  prisma.$queryRaw<{ text: string; score: number }[]>`
    SELECT text, (embedding <=> ${JSON.stringify(queryVec)}::vector) as score
    FROM "EmbeddingChunk"
    WHERE "collectionId" = ${collectionId}
      AND (embedding <=> ${JSON.stringify(queryVec)}::vector) < ${SIMILARITY_THRESHOLD}
    ORDER BY embedding <=> ${JSON.stringify(queryVec)}::vector
    LIMIT ${FETCH_K}
  `,
  prisma.$queryRaw<{ text: string }[]>`
    SELECT text
    FROM "EmbeddingChunk"
    WHERE "collectionId" = ${collectionId}
      AND to_tsvector('simple', text) @@ plainto_tsquery('simple', ${question})
    ORDER BY ts_rank(to_tsvector('simple', text), plainto_tsquery('simple', ${question})) DESC
    LIMIT ${FETCH_K}
  `.catch(() => [] as { text: string }[]), // graceful fallback if FTS fails
])

// If both searches returned nothing, skip
if (vecRows.length === 0 && bm25Rows.length === 0) {
  return { context: '', chunks: [], mode: 'skipped' }
}

// Build score map for vector results (to annotate chunks with similarity)
const vecScoreMap = new Map(vecRows.map(r => [r.text, r.score]))

// Merge with RRF
const merged = reciprocalRankFusion(vecRows, bm25Rows, topK)

// If we got only BM25 hits (no vector results passed threshold), still useful
const mode = vecRows.length > 0 ? 'semantic' : 'fallback'

const chunks = merged.map(r => {
  const vecScore = vecScoreMap.get(r.text)
  const annotation = vecScore !== undefined ? `[${(1 - vecScore).toFixed(2)}]` : '[bm25]'
  return `${annotation} ${r.text}`
})

return {
  context: merged.map(r => r.text).join('\n\n'),
  chunks,
  mode,
}
```

Also add the import at the top of `collections.ts`:
```ts
import { reciprocalRankFusion } from '@/lib/utils'
```

**Step 3: Verify TypeScript compiles**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/rag-debug
pnpm --filter @erp/web exec tsc --noEmit 2>&1 | head -20
```

Expected: no errors

**Step 4: Run tests**

```bash
cd /home/arktnld/projects/erp-api-tester-next
pnpm --filter @erp/web test -- --run 2>&1 | tail -10
```

Expected: all tests pass

**Step 5: Manual smoke test**

Start the dev server:
```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/rag-debug/apps/web
pnpm dev
```

Open the chat, select a collection, ask "como puxar todos os titulos" and verify:
- RAG indicator shows `semantic` or `fallback` mode (not `skipped`)
- Chunks include endpoint about titulos
- `[bm25]` annotation visible in chunks for results from full-text only

**Step 6: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/rag-debug
git add apps/web/app/actions/collections.ts
git commit -m "feat: hybrid BM25 + vector search with RRF for better RAG retrieval"
```

---

### Task 3: Add GIN index for full-text search performance (optional but recommended)

**Files:**
- No Prisma schema change needed — raw SQL only

**Step 1: Add the index via raw SQL**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/rag-debug
DATABASE_URL="postgresql://arktnld@localhost:5432/erp_tester" \
  npx --prefix packages/db prisma db execute --stdin <<'SQL'
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_embedding_chunk_fts
  ON "EmbeddingChunk" USING GIN (to_tsvector('simple', text));
SQL
```

Expected output: `Script executed successfully.`

**Step 2: Verify index exists**

```bash
DATABASE_URL="postgresql://arktnld@localhost:5432/erp_tester" \
  npx --prefix packages/db prisma db execute --stdin <<'SQL'
SELECT indexname FROM pg_indexes WHERE tablename = 'EmbeddingChunk' AND indexname LIKE '%fts%';
SQL
```

Expected: `idx_embedding_chunk_fts`

**Step 3: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/rag-debug
git commit --allow-empty -m "docs: GIN index added manually (idx_embedding_chunk_fts) for FTS performance"
```

> **Note:** This index is NOT tracked in Prisma schema. If the database is recreated, re-run the SQL from Step 1. Consider adding a `prisma/seed.ts` or a `db:setup` script to automate this if it becomes a pain point.
