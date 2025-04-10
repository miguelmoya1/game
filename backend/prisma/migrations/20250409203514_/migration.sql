/*
  Warnings:

  - The values [EQUITABLE] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `chaBonus` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `conBonus` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `dexBonus` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `intBonus` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `strBonus` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `wisBonus` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `currentMonthlyItemId` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `baseCha` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `baseCon` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `baseDex` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `baseInt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `baseStr` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `baseWis` on the `Player` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('E', 'D', 'C', 'B', 'A', 'S', 'SS', 'NATIONAL', 'INTERNATIONAL');

-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('EQUIPPABLE', 'USABLE');
ALTER TABLE "Item" ALTER COLUMN "itemType" TYPE "ItemType_new" USING ("itemType"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "ItemType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_currentMonthlyItemId_fkey";

-- DropIndex
DROP INDEX "Account_createdAt_idx";

-- DropIndex
DROP INDEX "Account_deletedAt_idx";

-- DropIndex
DROP INDEX "Account_updatedAt_idx";

-- DropIndex
DROP INDEX "Place_currentMonthlyItemId_idx";

-- DropIndex
DROP INDEX "PlaceApiHistory_createdAt_idx";

-- DropIndex
DROP INDEX "PlaceApiHistory_deletedAt_idx";

-- DropIndex
DROP INDEX "PlaceApiHistory_updatedAt_idx";

-- DropIndex
DROP INDEX "Player_createdAt_idx";

-- DropIndex
DROP INDEX "Player_deletedAt_idx";

-- DropIndex
DROP INDEX "Player_updatedAt_idx";

-- DropIndex
DROP INDEX "User_createdAt_idx";

-- DropIndex
DROP INDEX "User_deletedAt_idx";

-- DropIndex
DROP INDEX "User_updatedAt_idx";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "chaBonus",
DROP COLUMN "conBonus",
DROP COLUMN "dexBonus",
DROP COLUMN "intBonus",
DROP COLUMN "strBonus",
DROP COLUMN "wisBonus",
ADD COLUMN     "rank" "Rank";

-- AlterTable
ALTER TABLE "ItemStatBonus" ALTER COLUMN "value" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "currentMonthlyItemId",
ADD COLUMN     "currentItemId" TEXT;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "baseCha",
DROP COLUMN "baseCon",
DROP COLUMN "baseDex",
DROP COLUMN "baseInt",
DROP COLUMN "baseStr",
DROP COLUMN "baseWis",
ADD COLUMN     "rank" "Rank" NOT NULL DEFAULT 'E';

-- CreateIndex
CREATE INDEX "Item_rank_idx" ON "Item"("rank");

-- CreateIndex
CREATE INDEX "Place_currentItemId_idx" ON "Place"("currentItemId");

-- CreateIndex
CREATE INDEX "Player_rank_idx" ON "Player"("rank");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_currentItemId_fkey" FOREIGN KEY ("currentItemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
