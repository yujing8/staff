-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "department" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 1,
    "salary" TEXT NOT NULL DEFAULT '0',
    "status" TEXT NOT NULL DEFAULT '0'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
