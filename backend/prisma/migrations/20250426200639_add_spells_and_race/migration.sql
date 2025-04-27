/*
  Warnings:

  - Made the column `currentItemId` on table `Place` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `race` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Race" AS ENUM ('HUMAN', 'ELF', 'DWARF', 'ORC');

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_currentItemId_fkey";

-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "currentItemId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "race" "Race" NOT NULL;

-- CreateTable
CREATE TABLE "PlayerSpell" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerSpell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "race" "Race",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerSpell_playerId_idx" ON "PlayerSpell"("playerId");

-- CreateIndex
CREATE INDEX "PlayerSpell_spellId_idx" ON "PlayerSpell"("spellId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSpell_playerId_spellId_key" ON "PlayerSpell"("playerId", "spellId");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_name_key" ON "Spell"("name");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_currentItemId_fkey" FOREIGN KEY ("currentItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSpell" ADD CONSTRAINT "PlayerSpell_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSpell" ADD CONSTRAINT "PlayerSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;
