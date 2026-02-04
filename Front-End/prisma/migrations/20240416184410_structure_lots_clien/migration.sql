/*
  Warnings:

  - You are about to drop the column `utilisateur` on the `lots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lots" DROP COLUMN "utilisateur",
ADD COLUMN     "client" TEXT NOT NULL DEFAULT '';
