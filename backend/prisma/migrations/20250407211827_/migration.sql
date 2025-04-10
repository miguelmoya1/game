/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Stats` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('EQUITABLE', 'USABLE');

-- DropIndex
DROP INDEX "Stats_createdAt_idx";

-- DropIndex
DROP INDEX "Stats_deletedAt_idx";

-- DropIndex
DROP INDEX "Stats_type_idx";

-- DropIndex
DROP INDEX "Stats_updatedAt_idx";

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "currentMonthlyItemId" TEXT;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "baseCha" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "baseCon" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "baseDex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "baseInt" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "baseStr" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "baseWis" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "PlayerItemCollectionLog" (
    "id" TEXT NOT NULL,
    "collectionMonthYear" TEXT NOT NULL,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playerId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "PlayerItemCollectionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "isEquipped" BOOLEAN NOT NULL DEFAULT false,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "PlayerItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "itemType" "ItemType" NOT NULL,
    "imageUrl" TEXT,
    "strBonus" INTEGER NOT NULL DEFAULT 0,
    "dexBonus" INTEGER NOT NULL DEFAULT 0,
    "conBonus" INTEGER NOT NULL DEFAULT 0,
    "intBonus" INTEGER NOT NULL DEFAULT 0,
    "wisBonus" INTEGER NOT NULL DEFAULT 0,
    "chaBonus" INTEGER NOT NULL DEFAULT 0,
    "useEffect" TEXT,
    "spawnCategories" "PlaceCategory"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStatBonus" (
    "id" TEXT NOT NULL,
    "type" "StatsType" NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "ItemStatBonus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerItemCollectionLog_playerId_idx" ON "PlayerItemCollectionLog"("playerId");

-- CreateIndex
CREATE INDEX "PlayerItemCollectionLog_placeId_idx" ON "PlayerItemCollectionLog"("placeId");

-- CreateIndex
CREATE INDEX "PlayerItemCollectionLog_itemId_idx" ON "PlayerItemCollectionLog"("itemId");

-- CreateIndex
CREATE INDEX "PlayerItemCollectionLog_collectionMonthYear_idx" ON "PlayerItemCollectionLog"("collectionMonthYear");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerItemCollectionLog_playerId_placeId_collectionMonthYea_key" ON "PlayerItemCollectionLog"("playerId", "placeId", "collectionMonthYear");

-- CreateIndex
CREATE INDEX "PlayerItem_playerId_idx" ON "PlayerItem"("playerId");

-- CreateIndex
CREATE INDEX "PlayerItem_itemId_idx" ON "PlayerItem"("itemId");

-- CreateIndex
CREATE INDEX "PlayerItem_isEquipped_idx" ON "PlayerItem"("isEquipped");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE INDEX "Item_name_idx" ON "Item"("name");

-- CreateIndex
CREATE INDEX "Item_itemType_idx" ON "Item"("itemType");

-- CreateIndex
CREATE INDEX "Item_spawnCategories_idx" ON "Item"("spawnCategories");

-- CreateIndex
CREATE INDEX "ItemStatBonus_itemId_idx" ON "ItemStatBonus"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatBonus_itemId_type_key" ON "ItemStatBonus"("itemId", "type");

-- CreateIndex
CREATE INDEX "Place_currentMonthlyItemId_idx" ON "Place"("currentMonthlyItemId");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_currentMonthlyItemId_fkey" FOREIGN KEY ("currentMonthlyItemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerItemCollectionLog" ADD CONSTRAINT "PlayerItemCollectionLog_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerItemCollectionLog" ADD CONSTRAINT "PlayerItemCollectionLog_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerItemCollectionLog" ADD CONSTRAINT "PlayerItemCollectionLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerItem" ADD CONSTRAINT "PlayerItem_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerItem" ADD CONSTRAINT "PlayerItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStatBonus" ADD CONSTRAINT "ItemStatBonus_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
