/*
  Warnings:

  - Changed the type of `type` on the `Effect` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EffectType" AS ENUM ('PASSIVE_HEAL_TEAM', 'PASSIVE_HEAL_SELF', 'REVIVE_ONCE', 'IMMUNE_POISON');

-- AlterTable
ALTER TABLE "Effect" DROP COLUMN "type",
ADD COLUMN     "type" "EffectType" NOT NULL;

-- DropEnum
DROP TYPE "SetEffectType";
