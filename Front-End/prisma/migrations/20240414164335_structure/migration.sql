/*
  Warnings:

  - Made the column `renewal_date` on table `utilisateurs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lots" ALTER COLUMN "deliver_date" SET DATA TYPE TEXT,
ALTER COLUMN "production_date" SET DATA TYPE TEXT,
ALTER COLUMN "recuperation_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "objets" ALTER COLUMN "creation_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "utilisateurs" ALTER COLUMN "renewal_date" SET NOT NULL,
ALTER COLUMN "renewal_date" SET DEFAULT '',
ALTER COLUMN "renewal_date" SET DATA TYPE TEXT;
