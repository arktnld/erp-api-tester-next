-- Indexes for RequestHistory (filtering by company, endpoint, client, date, status)
CREATE INDEX IF NOT EXISTS "RequestHistory_companyId_idx" ON "RequestHistory"("companyId");
CREATE INDEX IF NOT EXISTS "RequestHistory_endpointId_idx" ON "RequestHistory"("endpointId");
CREATE INDEX IF NOT EXISTS "RequestHistory_testClientId_idx" ON "RequestHistory"("testClientId");
CREATE INDEX IF NOT EXISTS "RequestHistory_createdAt_idx" ON "RequestHistory"("createdAt");
CREATE INDEX IF NOT EXISTS "RequestHistory_statusCode_idx" ON "RequestHistory"("statusCode");

-- Index for EmbeddingChunk (filtering chunks by collection)
CREATE INDEX IF NOT EXISTS "EmbeddingChunk_collectionId_idx" ON "EmbeddingChunk"("collectionId");
