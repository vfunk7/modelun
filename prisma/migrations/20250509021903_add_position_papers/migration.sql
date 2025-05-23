/*
  Warnings:

  - You are about to drop the column `committeeId` on the `PositionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `PositionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `delegateId` on the `PositionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `PositionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `PositionPaper` table. All the data in the column will be lost.
  - Added the required column `content` to the `PositionPaper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delegateProfileId` to the `PositionPaper` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Committee_name_idx";

-- DropIndex
DROP INDEX "Country_name_idx";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DelegateProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "numberOfConferences" INTEGER NOT NULL DEFAULT 0,
    "awards" TEXT NOT NULL DEFAULT '',
    "committeePreferences" TEXT NOT NULL DEFAULT '',
    "assignedCommitteeId" TEXT,
    "assignedCountryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DelegateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_assignedCommitteeId_fkey" FOREIGN KEY ("assignedCommitteeId") REFERENCES "Committee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_assignedCountryId_fkey" FOREIGN KEY ("assignedCountryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DelegateProfile" ("assignedCommitteeId", "assignedCountryId", "awards", "committeePreferences", "createdAt", "id", "numberOfConferences", "updatedAt", "userId") SELECT "assignedCommitteeId", "assignedCountryId", "awards", "committeePreferences", "createdAt", "id", "numberOfConferences", "updatedAt", "userId" FROM "DelegateProfile";
DROP TABLE "DelegateProfile";
ALTER TABLE "new_DelegateProfile" RENAME TO "DelegateProfile";
CREATE UNIQUE INDEX "DelegateProfile_userId_key" ON "DelegateProfile"("userId");
CREATE INDEX "DelegateProfile_assignedCommitteeId_idx" ON "DelegateProfile"("assignedCommitteeId");
CREATE INDEX "DelegateProfile_assignedCountryId_idx" ON "DelegateProfile"("assignedCountryId");
CREATE TABLE "new_PositionPaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "delegateProfileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PositionPaper_delegateProfileId_fkey" FOREIGN KEY ("delegateProfileId") REFERENCES "DelegateProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PositionPaper" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "PositionPaper";
DROP TABLE "PositionPaper";
ALTER TABLE "new_PositionPaper" RENAME TO "PositionPaper";
CREATE UNIQUE INDEX "PositionPaper_delegateProfileId_key" ON "PositionPaper"("delegateProfileId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'DELEGATE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
