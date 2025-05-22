/*
  Warnings:

  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_nickname_idx";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "nickname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nickname";

-- CreateIndex
CREATE UNIQUE INDEX "Player_nickname_key" ON "Player"("nickname");
