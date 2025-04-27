/*
  Warnings:

  - You are about to drop the `ItemStatBonus` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SetEffectType" AS ENUM ('PASSIVE_HEAL_TEAM', 'PASSIVE_HEAL_SELF', 'REVIVE_ONCE', 'IMMUNE_POISON');

-- CreateEnum
CREATE TYPE "EffectTarget" AS ENUM ('TEAM', 'ENEMY', 'ALLY');

-- DropForeignKey
ALTER TABLE "ItemStatBonus" DROP CONSTRAINT "ItemStatBonus_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "setId" TEXT;

-- DropTable
DROP TABLE "ItemStatBonus";

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SetEffect" (
    "id" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "pieces" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SetEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" TEXT NOT NULL,
    "type" "SetEffectType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "target" "EffectTarget" NOT NULL,
    "setEffectId" TEXT NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatBonus" (
    "id" TEXT NOT NULL,
    "type" "StatsType" NOT NULL,
    "value" INTEGER NOT NULL,
    "itemId" TEXT,
    "setEffectId" TEXT,

    CONSTRAINT "StatBonus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Set_name_key" ON "Set"("name");

-- CreateIndex
CREATE INDEX "SetEffect_setId_idx" ON "SetEffect"("setId");

-- CreateIndex
CREATE UNIQUE INDEX "SetEffect_setId_pieces_key" ON "SetEffect"("setId", "pieces");

-- CreateIndex
CREATE INDEX "Effect_setEffectId_idx" ON "Effect"("setEffectId");

-- CreateIndex
CREATE INDEX "StatBonus_itemId_idx" ON "StatBonus"("itemId");

-- CreateIndex
CREATE INDEX "StatBonus_setEffectId_idx" ON "StatBonus"("setEffectId");

-- CreateIndex
CREATE UNIQUE INDEX "StatBonus_itemId_type_key" ON "StatBonus"("itemId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "StatBonus_setEffectId_type_key" ON "StatBonus"("setEffectId", "type");

-- CreateIndex
CREATE INDEX "Item_setId_idx" ON "Item"("setId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetEffect" ADD CONSTRAINT "SetEffect_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_setEffectId_fkey" FOREIGN KEY ("setEffectId") REFERENCES "SetEffect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatBonus" ADD CONSTRAINT "StatBonus_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatBonus" ADD CONSTRAINT "StatBonus_setEffectId_fkey" FOREIGN KEY ("setEffectId") REFERENCES "SetEffect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
