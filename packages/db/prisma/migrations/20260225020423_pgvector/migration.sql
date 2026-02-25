-- AlterTable
ALTER TABLE "EmbeddingChunk" ALTER COLUMN "embedding" SET DATA TYPE vector(1536) USING embedding::vector(1536);
