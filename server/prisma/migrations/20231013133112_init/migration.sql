/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Staff` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "department" TEXT NOT NULL DEFAULT '技术部',
    "position" TEXT NOT NULL DEFAULT '普通职工',
    "salary" TEXT NOT NULL DEFAULT '0',
    "attendance" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Staff" ("attendance", "id", "name", "password", "salary") SELECT "attendance", "id", "name", "password", "salary" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_name_key" ON "Staff"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
