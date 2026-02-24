-- CreateTable
CREATE TABLE "ERP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "authType" TEXT NOT NULL DEFAULT 'none',
    "authConfig" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ERPFieldSchema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "fieldName" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL DEFAULT 'text',
    "required" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ERPFieldSchema_erpId_fkey" FOREIGN KEY ("erpId") REFERENCES "ERP" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "pathTemplate" TEXT NOT NULL,
    "bodyTemplate" TEXT NOT NULL DEFAULT '',
    "headers" TEXT NOT NULL DEFAULT '{}',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Endpoint_erpId_fkey" FOREIGN KEY ("erpId") REFERENCES "ERP" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "erpId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_erpId_fkey" FOREIGN KEY ("erpId") REFERENCES "ERP" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TestClient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "fieldsData" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TestClient_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RequestHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ERP_name_key" ON "ERP"("name");
