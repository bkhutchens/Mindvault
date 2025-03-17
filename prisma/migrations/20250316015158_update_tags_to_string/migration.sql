/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transcription" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Note" ("createdAt", "id", "summary", "tags", "transcription") SELECT "createdAt", "id", "summary", "tags", "transcription" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
