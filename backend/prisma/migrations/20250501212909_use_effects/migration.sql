/*
  Warnings:

  - You are about to drop the column `setEffects` on the `Set` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "setEffects",
ADD COLUMN     "effects" JSONB;
