-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DelegateProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "numberOfConferences" INTEGER NOT NULL DEFAULT 0,
    "awards" TEXT,
    "committeePreferences" TEXT,
    "committeeId" TEXT,
    "countryId" TEXT,
    "positionPaper" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DelegateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DelegateProfile" ("awards", "committeeId", "committeePreferences", "countryId", "createdAt", "id", "numberOfConferences", "positionPaper", "updatedAt", "userId") SELECT "awards", "committeeId", "committeePreferences", "countryId", "createdAt", "id", "numberOfConferences", "positionPaper", "updatedAt", "userId" FROM "DelegateProfile";
DROP TABLE "DelegateProfile";
ALTER TABLE "new_DelegateProfile" RENAME TO "DelegateProfile";
CREATE UNIQUE INDEX "DelegateProfile_userId_key" ON "DelegateProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
