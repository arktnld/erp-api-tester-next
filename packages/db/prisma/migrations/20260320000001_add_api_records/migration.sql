-- CreateTable
CREATE TABLE "ApiRecord" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordBlock" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "endpointId" INTEGER,
    "clientId" INTEGER,
    "response" JSONB,
    "note" TEXT NOT NULL DEFAULT '',
    "executedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApiRecord" ADD CONSTRAINT "ApiRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordBlock" ADD CONSTRAINT "RecordBlock_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "ApiRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
