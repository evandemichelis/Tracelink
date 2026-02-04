/*
  Warnings:

  - You are about to drop the column `user` on the `objets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "objets" DROP COLUMN "user",
ADD COLUMN     "utilisateur" TEXT NOT NULL DEFAULT '';
