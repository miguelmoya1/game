-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('EMAIL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PlaceAmenity" AS ENUM ('PLACE_OF_WORSHIP');

-- CreateEnum
CREATE TYPE "StatsType" AS ENUM ('STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "surname" TEXT,
    "nickname" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "addressName" TEXT,
    "amenity" "PlaceAmenity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceApiHistory" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "radius" INTEGER NOT NULL,
    "lastRequestAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PlaceApiHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "provider" "AccountProvider" NOT NULL DEFAULT 'EMAIL',
    "providerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "hashForPasswordReset" TEXT,
    "hashExpiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "type" "StatsType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_surname_idx" ON "User"("surname");

-- CreateIndex
CREATE INDEX "User_nickname_idx" ON "User"("nickname");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_updatedAt_idx" ON "User"("updatedAt");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "Place_name_idx" ON "Place"("name");

-- CreateIndex
CREATE INDEX "Place_lat_idx" ON "Place"("lat");

-- CreateIndex
CREATE INDEX "Place_lng_idx" ON "Place"("lng");

-- CreateIndex
CREATE INDEX "Place_createdAt_idx" ON "Place"("createdAt");

-- CreateIndex
CREATE INDEX "Place_updatedAt_idx" ON "Place"("updatedAt");

-- CreateIndex
CREATE INDEX "Place_deletedAt_idx" ON "Place"("deletedAt");

-- CreateIndex
CREATE INDEX "PlaceApiHistory_lat_idx" ON "PlaceApiHistory"("lat");

-- CreateIndex
CREATE INDEX "PlaceApiHistory_lng_idx" ON "PlaceApiHistory"("lng");

-- CreateIndex
CREATE INDEX "PlaceApiHistory_createdAt_idx" ON "PlaceApiHistory"("createdAt");

-- CreateIndex
CREATE INDEX "PlaceApiHistory_updatedAt_idx" ON "PlaceApiHistory"("updatedAt");

-- CreateIndex
CREATE INDEX "PlaceApiHistory_deletedAt_idx" ON "PlaceApiHistory"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "Account_provider_idx" ON "Account"("provider");

-- CreateIndex
CREATE INDEX "Account_providerId_idx" ON "Account"("providerId");

-- CreateIndex
CREATE INDEX "Account_isConfirmed_idx" ON "Account"("isConfirmed");

-- CreateIndex
CREATE INDEX "Account_createdAt_idx" ON "Account"("createdAt");

-- CreateIndex
CREATE INDEX "Account_updatedAt_idx" ON "Account"("updatedAt");

-- CreateIndex
CREATE INDEX "Account_deletedAt_idx" ON "Account"("deletedAt");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE INDEX "Player_userId_idx" ON "Player"("userId");

-- CreateIndex
CREATE INDEX "Player_createdAt_idx" ON "Player"("createdAt");

-- CreateIndex
CREATE INDEX "Player_updatedAt_idx" ON "Player"("updatedAt");

-- CreateIndex
CREATE INDEX "Player_deletedAt_idx" ON "Player"("deletedAt");

-- CreateIndex
CREATE INDEX "Stats_playerId_idx" ON "Stats"("playerId");

-- CreateIndex
CREATE INDEX "Stats_createdAt_idx" ON "Stats"("createdAt");

-- CreateIndex
CREATE INDEX "Stats_updatedAt_idx" ON "Stats"("updatedAt");

-- CreateIndex
CREATE INDEX "Stats_deletedAt_idx" ON "Stats"("deletedAt");

-- CreateIndex
CREATE INDEX "Stats_type_idx" ON "Stats"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_playerId_type_key" ON "Stats"("playerId", "type");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
