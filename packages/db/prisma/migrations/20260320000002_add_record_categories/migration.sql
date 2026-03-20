-- CreateTable
CREATE TABLE "RecordCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RecordCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordCategory_name_key" ON "RecordCategory"("name");

-- AlterTable
ALTER TABLE "ApiRecord" ADD COLUMN "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "ApiRecord" ADD CONSTRAINT "ApiRecord_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "RecordCategory"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
