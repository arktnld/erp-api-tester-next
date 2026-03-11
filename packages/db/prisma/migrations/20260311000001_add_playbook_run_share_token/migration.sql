ALTER TABLE "PlaybookRun" ADD COLUMN "shareToken" TEXT;
CREATE UNIQUE INDEX "PlaybookRun_shareToken_key" ON "PlaybookRun"("shareToken");
