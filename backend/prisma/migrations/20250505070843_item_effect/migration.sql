/*
  Warnings:

  - You are about to drop the column `useEffect` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "useEffect",
ADD COLUMN     "effect" JSONB;
