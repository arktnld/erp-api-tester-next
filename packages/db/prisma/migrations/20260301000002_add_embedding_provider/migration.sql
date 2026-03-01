ALTER TABLE "PostmanCollection" ADD COLUMN IF NOT EXISTS "embeddingProvider" TEXT NOT NULL DEFAULT 'openai';
