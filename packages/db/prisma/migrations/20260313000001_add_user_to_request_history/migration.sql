ALTER TABLE "RequestHistory" ADD COLUMN "userId" TEXT;
ALTER TABLE "RequestHistory" ADD COLUMN "userEmail" TEXT;
CREATE INDEX "RequestHistory_userId_idx" ON "RequestHistory"("userId");
