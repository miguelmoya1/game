/*
  Warnings:

  - You are about to drop the column `xp` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "xp",
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0;
