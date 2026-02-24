-- Add auth+url columns to Company
ALTER TABLE "Company" ADD COLUMN "baseUrl" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN "authType" TEXT NOT NULL DEFAULT 'none';
ALTER TABLE "Company" ADD COLUMN "authConfig" TEXT NOT NULL DEFAULT '{}';

-- Add optional ID columns to RequestHistory for "Repetir" feature
ALTER TABLE "RequestHistory" ADD COLUMN "companyId" INTEGER;
ALTER TABLE "RequestHistory" ADD COLUMN "endpointId" INTEGER;
ALTER TABLE "RequestHistory" ADD COLUMN "testClientId" INTEGER;

-- Remove baseUrl/authType/authConfig from ERP (SQLite requires table recreation)
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_ERP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "new_ERP" ("id", "name", "createdAt")
SELECT "id", "name", "createdAt" FROM "ERP";

DROP TABLE "ERP";
ALTER TABLE "new_ERP" RENAME TO "ERP";
CREATE UNIQUE INDEX "ERP_name_key" ON "ERP"("name");

PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
