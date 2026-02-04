/*
  Warnings:

  - You are about to drop the column `recupered_lot` on the `transporteurs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transporteurs" DROP COLUMN "recupered_lot",
ADD COLUMN     "recupered_lots" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
