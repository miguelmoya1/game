/*
  Warnings:

  - You are about to drop the column `lat` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `Effect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SetEffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatBonus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stats` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatsTarget" AS ENUM ('ALLY', 'ENEMY', 'SELF', 'TEAM');

-- AlterEnum
ALTER TYPE "EffectTarget" ADD VALUE 'SELF';

-- DropForeignKey
ALTER TABLE "Effect" DROP CONSTRAINT "Effect_setEffectId_fkey";

-- DropForeignKey
ALTER TABLE "SetEffect" DROP CONSTRAINT "SetEffect_setId_fkey";

-- DropForeignKey
ALTER TABLE "StatBonus" DROP CONSTRAINT "StatBonus_itemId_fkey";

-- DropForeignKey
ALTER TABLE "StatBonus" DROP CONSTRAINT "StatBonus_setEffectId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_playerId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "stats" JSONB;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "stats" JSONB NOT NULL,
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "setEffects" JSONB;

-- DropTable
DROP TABLE "Effect";

-- DropTable
DROP TABLE "SetEffect";

-- DropTable
DROP TABLE "StatBonus";

-- DropTable
DROP TABLE "Stats";
