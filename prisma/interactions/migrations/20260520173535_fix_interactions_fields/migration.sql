/*
  Warnings:

  - A unique constraint covering the columns `[fromUserId,toUserId]` on the table `UserInteraction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `UserInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInteraction" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserInteraction_fromUserId_toUserId_key" ON "UserInteraction"("fromUserId", "toUserId");
