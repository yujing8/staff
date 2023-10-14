-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
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
INSERT INTO "new_User" ("departmentId", "id", "name", "password", "positionId", "salary", "status") SELECT "departmentId", "id", "name", "password", "positionId", "salary", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
