/*
  Warnings:

  - You are about to drop the column `assignedCommitteeId` on the `DelegateProfile` table. All the data in the column will be lost.
  - You are about to drop the column `assignedCountryId` on the `DelegateProfile` table. All the data in the column will be lost.
  - You are about to drop the column `delegateProfileId` on the `PositionPaper` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PositionPaper` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Committee_name_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DelegateProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "numberOfConferences" INTEGER NOT NULL DEFAULT 0,
    "awards" TEXT NOT NULL DEFAULT '[]',
    "committeePreferences" TEXT NOT NULL DEFAULT '[]',
    "committeeId" TEXT,
    "countryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DelegateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DelegateProfile" ("awards", "committeePreferences", "createdAt", "id", "numberOfConferences", "updatedAt", "userId") SELECT "awards", "committeePreferences", "createdAt", "id", "numberOfConferences", "updatedAt", "userId" FROM "DelegateProfile";
DROP TABLE "DelegateProfile";
ALTER TABLE "new_DelegateProfile" RENAME TO "DelegateProfile";
CREATE UNIQUE INDEX "DelegateProfile_userId_key" ON "DelegateProfile"("userId");
CREATE TABLE "new_PositionPaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PositionPaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PositionPaper" ("content", "createdAt", "id", "status", "updatedAt") SELECT "content", "createdAt", "id", "status", "updatedAt" FROM "PositionPaper";
DROP TABLE "PositionPaper";
ALTER TABLE "new_PositionPaper" RENAME TO "PositionPaper";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
