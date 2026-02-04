-- AlterTable
ALTER TABLE "transporteurs" ALTER COLUMN "numberDeliveredLot" SET DEFAULT 0,
ALTER COLUMN "DeliveredLots" SET DEFAULT ARRAY[]::INTEGER[];
