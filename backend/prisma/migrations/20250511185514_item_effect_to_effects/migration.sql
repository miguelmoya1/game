/*
  Warnings:

  - You are about to drop the column `effect` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "effect",
ADD COLUMN     "effects" JSONB;
