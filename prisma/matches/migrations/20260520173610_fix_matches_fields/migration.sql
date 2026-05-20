/*
  Warnings:

  - You are about to drop the column `userAId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `userBId` on the `Match` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1Id` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Match_userAId_userBId_key";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "userAId",
DROP COLUMN "userBId",
ADD COLUMN     "user1Id" INTEGER NOT NULL,
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Match_user1Id_user2Id_key" ON "Match"("user1Id", "user2Id");
