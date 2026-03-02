# Sensitive Values Toggle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Mask auth tokens/passwords in the Testar API screen by default, with a global toggle button to reveal them.

**Architecture:** Derive a `Set<string>` of sensitive values from `company.authConfig` in `test-page.tsx` and pass it down to `TestRequest`. Inside `TestRequest`, a `showSensitive` boolean state controls whether values are masked. A toggle button (Eye/EyeOff icon) sits in the Request panel header. Masking applies to: header values in the response table, and `resolvedBody` text before rendering in form mode. cURL string and raw body editor are untouched.

**Tech Stack:** React, lucide-react (Eye/EyeOff icons already available), TypeScript

---

### Task 1: Derive sensitiveValues in test-page.tsx and pass to TestRequest

**Files:**
- Modify: `apps/web/app/test/test-page.tsx`
- Modify: `apps/web/app/test/components/test-request.tsx` (only the prop interface, no logic yet)

**Step 1: Read both files**

Read `apps/web/app/test/test-page.tsx` and `apps/web/app/test/components/test-request.tsx` to confirm current signatures.

**Step 2: Add sensitiveValues derivation to test-page.tsx**

In `test-page.tsx`, after the existing derived values (lines around `const erp = ...`, `const company = ...`), add:

```ts
const sensitiveValues: Set<string> = new Set(
  company?.authConfig
    ? Object.values(company.authConfig as Record<string, string>).filter(
        (v) => typeof v === 'string' && v.length > 4
      )
    : []
)
```

**Step 3: Pass sensitiveValues to TestRequest**

In the JSX, add `sensitiveValues={sensitiveValues}` to `<TestRequest ... />`.

**Step 4: Add sensitiveValues to TestRequest prop interface**

In `test-request.tsx`, add to `TestRequestProps`:

```ts
sensitiveValues: Set<string>
```

And destructure it in the function signature. No logic yet — just accepting the prop.

**Step 5: Verify TypeScript**

```bash
cd /path/to/worktree && pnpm --filter web exec tsc --noEmit 2>&1 | grep "test-page\|test-request" | head -10
```

Expected: no errors on these files.

**Step 6: Commit**

```bash
git add apps/web/app/test/test-page.tsx apps/web/app/test/components/test-request.tsx
git commit -m "feat(test): pass sensitiveValues from authConfig to TestRequest"
```

---

### Task 2: Add showSensitive state and toggle button to TestRequest

**Files:**
- Modify: `apps/web/app/test/components/test-request.tsx`

**Step 1: Add useState import and showSensitive state**

At the top of `TestRequest` function body, add:

```ts
const [showSensitive, setShowSensitive] = useState(false)
```

Make sure `useState` is already imported from `'react'` — if not, add it.

**Step 2: Add Eye/EyeOff import from lucide-react**

```ts
import { Eye, EyeOff } from 'lucide-react'
```

**Step 3: Add toggle button next to "Headers" label**

The current Headers section starts with:
```tsx
<p style={sectionLabel}>Headers</p>
```

Replace with a flex row that has the label and toggle button:

```tsx
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
  <p style={{ ...sectionLabel, marginBottom: 0 }}>Headers</p>
  <button
    onClick={() => setShowSensitive(s => !s)}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: 11,
      padding: '2px 4px',
    }}
  >
    {showSensitive ? <Eye size={12} /> : <EyeOff size={12} />}
    {showSensitive ? 'Ocultar' : 'Revelar'}
  </button>
</div>
```

**Step 4: Verify it renders without errors**

```bash
pnpm --filter web exec tsc --noEmit 2>&1 | grep "test-request" | head -10
```

Expected: no errors.

**Step 5: Commit**

```bash
git add apps/web/app/test/components/test-request.tsx
git commit -m "feat(test): add show/hide sensitive values toggle button"
```

---

### Task 3: Apply masking to headers table

**Files:**
- Modify: `apps/web/app/test/components/test-request.tsx`

**Step 1: Create maskValue helper inside TestRequest**

Add this function inside the component (after the state declarations):

```ts
function maskValue(value: string): string {
  if (showSensitive || sensitiveValues.size === 0) return value
  let result = value
  for (const secret of sensitiveValues) {
    result = result.replaceAll(secret, '••••••••')
  }
  return result
}
```

**Step 2: Apply maskValue to header table cells**

Find the table row rendering in the Headers section:

```tsx
<td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{v}</td>
```

Replace `{v}` with `{maskValue(v)}`:

```tsx
<td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{maskValue(v)}</td>
```

**Step 3: Verify TypeScript**

```bash
pnpm --filter web exec tsc --noEmit 2>&1 | grep "test-request" | head -10
```

Expected: no errors.

**Step 4: Commit**

```bash
git add apps/web/app/test/components/test-request.tsx
git commit -m "feat(test): mask sensitive header values by default"
```

---

### Task 4: Apply masking to body (form mode)

**Files:**
- Modify: `apps/web/app/test/components/test-request.tsx`

**Step 1: Apply maskValue to resolvedBody before CodeBlock**

Find the form mode body rendering:

```tsx
{bodyMode === 'form' ? (
  resolvedBody ? (
    <CodeBlock ...>
      {tryPrettyJson(resolvedBody)}
    </CodeBlock>
  ) : ...
```

Replace `{tryPrettyJson(resolvedBody)}` with `{maskValue(tryPrettyJson(resolvedBody))}`:

```tsx
{bodyMode === 'form' ? (
  resolvedBody ? (
    <CodeBlock
      language="json"
      customStyle={{ margin: 0, borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)' }}
    >
      {maskValue(tryPrettyJson(resolvedBody))}
    </CodeBlock>
  ) : (
    <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Nenhum body para este endpoint.</p>
  )
) : (
  // raw mode — unchanged
  ...
)}
```

**Step 2: Verify TypeScript**

```bash
pnpm --filter web exec tsc --noEmit 2>&1 | grep "test-request" | head -10
```

Expected: no errors.

**Step 3: Commit**

```bash
git add apps/web/app/test/components/test-request.tsx
git commit -m "feat(test): mask sensitive body values in form mode"
```

---

### Task 5: Reset showSensitive when company changes

**Files:**
- Modify: `apps/web/app/test/components/test-request.tsx`

**Step 1: Add useEffect to reset on sensitiveValues change**

When the company changes, `sensitiveValues` is a new Set with different values. Reset `showSensitive` to `false`:

```ts
import { useState, useEffect } from 'react'

// inside TestRequest:
useEffect(() => {
  setShowSensitive(false)
}, [sensitiveValues.size])
```

Note: `sensitiveValues.size` is used as the dependency because a `Set` object reference changes on every render. Using `.size` is a stable numeric proxy — if the size changes, the company likely changed. This is a pragmatic approximation; a more correct approach would be to pass a stable string key, but that's over-engineering for this use case.

**Step 2: Verify TypeScript**

```bash
pnpm --filter web exec tsc --noEmit 2>&1 | grep "test-request" | head -10
```

Expected: no errors.

**Step 3: Commit**

```bash
git add apps/web/app/test/components/test-request.tsx
git commit -m "feat(test): reset sensitive toggle when company changes"
```

---

### Task 6: Deploy

**Step 1: Verify no TypeScript errors across the whole app**

```bash
pnpm --filter web exec tsc --noEmit 2>&1 | grep -v "button.test\|roles.test" | grep "error" | head -10
```

Expected: no errors (pre-existing test file errors are excluded).

**Step 2: Push and deploy**

```bash
git push origin master
bash scripts/deploy.sh
```

Expected: build succeeds with `ƒ /test` in the route list, PM2 restarts.
