/*
  Warnings:

  - A unique constraint covering the columns `[subId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "subId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_subId_key" ON "User"("subId");
