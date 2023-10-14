/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "departmentId" INTEGER NOT NULL DEFAULT 0,
    "positionId" INTEGER NOT NULL DEFAULT 1,
    "salary" TEXT NOT NULL DEFAULT '0',
    "reward" TEXT NOT NULL DEFAULT '0',
    "attendance" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT '0'
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_name_key" ON "Staff"("name");
