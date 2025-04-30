/*
  Warnings:

  - You are about to drop the column `race` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `Spell` table. All the data in the column will be lost.
  - You are about to drop the `PlayerSpell` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `raceId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceId` to the `Spell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayerSpell" DROP CONSTRAINT "PlayerSpell_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerSpell" DROP CONSTRAINT "PlayerSpell_spellId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "race",
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "raceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Spell" DROP COLUMN "race",
ADD COLUMN     "raceId" TEXT NOT NULL,
ADD COLUMN     "requiredLevel" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "PlayerSpell";

-- DropEnum
DROP TYPE "Race";

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPlayable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE INDEX "Race_name_idx" ON "Race"("name");

-- CreateIndex
CREATE INDEX "Race_isPlayable_idx" ON "Race"("isPlayable");

-- CreateIndex
CREATE INDEX "Player_raceId_idx" ON "Player"("raceId");

-- CreateIndex
CREATE INDEX "Player_level_idx" ON "Player"("level");

-- CreateIndex
CREATE INDEX "Spell_raceId_idx" ON "Spell"("raceId");

-- CreateIndex
CREATE INDEX "Spell_requiredLevel_idx" ON "Spell"("requiredLevel");

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
