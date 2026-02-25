-- CreateTable
CREATE TABLE "ERP" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ERP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ERPFieldSchema" (
    "id" SERIAL NOT NULL,
    "erpId" INTEGER NOT NULL,
    "fieldName" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL DEFAULT 'text',
    "required" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ERPFieldSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" SERIAL NOT NULL,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "pathTemplate" TEXT NOT NULL,
    "bodyTemplate" TEXT NOT NULL DEFAULT '',
    "headers" TEXT NOT NULL DEFAULT '{}',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "erpId" INTEGER NOT NULL,
    "baseUrl" TEXT NOT NULL DEFAULT '',
    "authType" TEXT NOT NULL DEFAULT 'none',
    "authConfig" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestClient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "fieldsData" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostmanCollection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "systemPrompt" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostmanCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbeddingChunk" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" TEXT NOT NULL,

    CONSTRAINT "EmbeddingChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestHistory" (
    "id" SERIAL NOT NULL,
    "erpName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "endpointName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "requestBody" TEXT NOT NULL DEFAULT '',
    "requestHeaders" TEXT NOT NULL DEFAULT '{}',
    "statusCode" INTEGER NOT NULL,
    "responseBody" TEXT NOT NULL DEFAULT '',
    "responseHeaders" TEXT NOT NULL DEFAULT '{}',
    "durationMs" INTEGER NOT NULL,
    "companyId" INTEGER,
    "endpointId" INTEGER,
    "testClientId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ERP_name_key" ON "ERP"("name");

-- AddForeignKey
ALTER TABLE "ERPFieldSchema" ADD CONSTRAINT "ERPFieldSchema_erpId_fkey" FOREIGN KEY ("erpId") REFERENCES "ERP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_erpId_fkey" FOREIGN KEY ("erpId") REFERENCES "ERP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_erpId_fkey" FOREIGN KEY ("erpId") REFERENCES "ERP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestClient" ADD CONSTRAINT "TestClient_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmbeddingChunk" ADD CONSTRAINT "EmbeddingChunk_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "PostmanCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
