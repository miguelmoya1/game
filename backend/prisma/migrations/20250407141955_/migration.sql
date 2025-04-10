/*
  Warnings:

  - You are about to drop the column `addressName` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `amenity` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apiId]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('KNOWLEDGE', 'FAITH', 'NATURE', 'COMMERCE', 'FITNESS', 'COMMUNITY', 'CRAFT', 'HEALTH', 'ARTS', 'HISTORIC');

-- DropIndex
DROP INDEX "Place_createdAt_idx";

-- DropIndex
DROP INDEX "Place_deletedAt_idx";

-- DropIndex
DROP INDEX "Place_lat_idx";

-- DropIndex
DROP INDEX "Place_lng_idx";

-- DropIndex
DROP INDEX "Place_updatedAt_idx";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "addressName",
DROP COLUMN "amenity",
ADD COLUMN     "categories" "PlaceCategory"[],
ADD COLUMN     "osmTags" JSONB;

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "PlaceAmenity";

-- CreateIndex
CREATE UNIQUE INDEX "Place_apiId_key" ON "Place"("apiId");

-- CreateIndex
CREATE INDEX "Place_apiId_idx" ON "Place"("apiId");

-- CreateIndex
CREATE INDEX "Place_lat_lng_idx" ON "Place"("lat", "lng");
