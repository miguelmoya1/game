/*
  Warnings:

  - You are about to drop the column `stats` on the `Item` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Target" AS ENUM ('ALLY', 'ENEMY', 'SELF', 'TEAM');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "stats";

-- DropEnum
DROP TYPE "EffectTarget";

-- DropEnum
DROP TYPE "StatsTarget";
