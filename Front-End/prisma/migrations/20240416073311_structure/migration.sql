/*
  Warnings:

  - You are about to drop the column `deliver_date` on the `lots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lots" DROP COLUMN "deliver_date",
ADD COLUMN     "delivery_date" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "destination" TEXT NOT NULL DEFAULT '';
