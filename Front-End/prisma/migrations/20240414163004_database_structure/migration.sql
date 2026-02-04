/*
  Warnings:

  - You are about to drop the column `deliverDate` on the `lots` table. All the data in the column will be lost.
  - You are about to drop the column `lotNumber` on the `lots` table. All the data in the column will be lost.
  - You are about to drop the column `objectsNumber` on the `lots` table. All the data in the column will be lost.
  - You are about to drop the column `productionDate` on the `lots` table. All the data in the column will be lost.
  - You are about to drop the column `recuperationDate` on the `lots` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreation` on the `objets` table. All the data in the column will be lost.
  - You are about to drop the column `firmWareVersion` on the `objets` table. All the data in the column will be lost.
  - You are about to drop the column `hardWareVersion` on the `objets` table. All the data in the column will be lost.
  - You are about to drop the column `lotNumber` on the `objets` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `objets` table. All the data in the column will be lost.
  - You are about to drop the column `nombreLots` on the `producteurs` table. All the data in the column will be lost.
  - You are about to drop the column `profilPicture` on the `producteurs` table. All the data in the column will be lost.
  - You are about to drop the column `DeliveredLots` on the `transporteurs` table. All the data in the column will be lost.
  - You are about to drop the column `numberDeliveredLot` on the `transporteurs` table. All the data in the column will be lost.
  - You are about to drop the column `profilPicture` on the `transporteurs` table. All the data in the column will be lost.
  - You are about to drop the column `profilPicture` on the `utilisateurs` table. All the data in the column will be lost.
  - You are about to drop the column `renewalDate` on the `utilisateurs` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumberObject` on the `utilisateurs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lot_number]` on the table `lots` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serial_number]` on the table `objets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serial_number_object]` on the table `utilisateurs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deliver_date` to the `lots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_number` to the `lots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objects_number` to the `lots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production_date` to the `lots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recuperation_date` to the `lots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creation_date` to the `objets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firmware_version` to the `objets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hardware_version` to the `objets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_number` to the `objets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial_number` to the `objets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "lots_lotNumber_key";

-- DropIndex
DROP INDEX "objets_serialNumber_key";

-- DropIndex
DROP INDEX "utilisateurs_serialNumberObject_key";

-- AlterTable
ALTER TABLE "lots" DROP COLUMN "deliverDate",
DROP COLUMN "lotNumber",
DROP COLUMN "objectsNumber",
DROP COLUMN "productionDate",
DROP COLUMN "recuperationDate",
ADD COLUMN     "deliver_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lot_number" INTEGER NOT NULL,
ADD COLUMN     "objects_number" INTEGER NOT NULL,
ADD COLUMN     "production_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "recuperation_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "objets" DROP COLUMN "dateCreation",
DROP COLUMN "firmWareVersion",
DROP COLUMN "hardWareVersion",
DROP COLUMN "lotNumber",
DROP COLUMN "serialNumber",
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firmware_version" INTEGER NOT NULL,
ADD COLUMN     "hardware_version" INTEGER NOT NULL,
ADD COLUMN     "lot_number" INTEGER NOT NULL,
ADD COLUMN     "serial_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "producteurs" DROP COLUMN "nombreLots",
DROP COLUMN "profilPicture",
ADD COLUMN     "nombre_lots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profil_picture" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "transporteurs" DROP COLUMN "DeliveredLots",
DROP COLUMN "numberDeliveredLot",
DROP COLUMN "profilPicture",
ADD COLUMN     "delivered_lots" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "number_delivered_lot" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profil_picture" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "utilisateurs" DROP COLUMN "profilPicture",
DROP COLUMN "renewalDate",
DROP COLUMN "serialNumberObject",
ADD COLUMN     "profil_picture" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "renewal_date" TIMESTAMP(3),
ADD COLUMN     "serial_number_object" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "lots_lot_number_key" ON "lots"("lot_number");

-- CreateIndex
CREATE UNIQUE INDEX "objets_serial_number_key" ON "objets"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_serial_number_object_key" ON "utilisateurs"("serial_number_object");
