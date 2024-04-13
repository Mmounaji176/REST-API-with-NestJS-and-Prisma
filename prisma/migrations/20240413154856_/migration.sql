/*
  Warnings:

  - The `isAdmin` column on the `ChatRoomMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isBanned` column on the `ChatRoomMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ChatRoomMember" DROP COLUMN "isAdmin",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "isBanned",
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;
