-- AlterTable
ALTER TABLE "transporteurs" ADD COLUMN     "number_recupered_lot" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "recupered_lot" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
