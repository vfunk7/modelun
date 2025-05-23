-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'DELEGATE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DelegateProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "numberOfConferences" INTEGER NOT NULL DEFAULT 0,
    "awards" TEXT NOT NULL,
    "committeePreferences" TEXT NOT NULL,
    "assignedCommitteeId" TEXT,
    "assignedCountryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DelegateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_assignedCommitteeId_fkey" FOREIGN KEY ("assignedCommitteeId") REFERENCES "Committee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DelegateProfile_assignedCountryId_fkey" FOREIGN KEY ("assignedCountryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PositionPaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "delegateId" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PositionPaper_delegateId_fkey" FOREIGN KEY ("delegateId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PositionPaper_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PositionPaper_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "DelegateProfile_userId_key" ON "DelegateProfile"("userId");

-- CreateIndex
CREATE INDEX "DelegateProfile_assignedCommitteeId_idx" ON "DelegateProfile"("assignedCommitteeId");

-- CreateIndex
CREATE INDEX "DelegateProfile_assignedCountryId_idx" ON "DelegateProfile"("assignedCountryId");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_name_key" ON "Committee"("name");

-- CreateIndex
CREATE INDEX "Committee_name_idx" ON "Committee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE INDEX "Country_name_idx" ON "Country"("name");

-- CreateIndex
CREATE INDEX "PositionPaper_delegateId_idx" ON "PositionPaper"("delegateId");

-- CreateIndex
CREATE INDEX "PositionPaper_committeeId_idx" ON "PositionPaper"("committeeId");

-- CreateIndex
CREATE INDEX "PositionPaper_countryId_idx" ON "PositionPaper"("countryId");

-- CreateIndex
CREATE INDEX "PositionPaper_uploadedAt_idx" ON "PositionPaper"("uploadedAt");
