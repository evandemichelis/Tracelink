/*
  Warnings:

  - You are about to drop the `Lot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Objet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producteur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transporteur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Utilisateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Lot";

-- DropTable
DROP TABLE "Objet";

-- DropTable
DROP TABLE "Producteur";

-- DropTable
DROP TABLE "Transporteur";

-- DropTable
DROP TABLE "Utilisateur";

-- CreateTable
CREATE TABLE "objets" (
    "id" SERIAL NOT NULL,
    "barrecode" TEXT NOT NULL,
    "lotNumber" INTEGER NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "hardWareVersion" INTEGER NOT NULL,
    "firmWareVersion" INTEGER NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL,
    "lot" INTEGER NOT NULL,

    CONSTRAINT "objets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lots" (
    "id" SERIAL NOT NULL,
    "lotNumber" INTEGER NOT NULL,
    "objectsNumber" INTEGER NOT NULL,
    "objects" INTEGER[],
    "productionDate" TIMESTAMP(3) NOT NULL,
    "recuperationDate" TIMESTAMP(3) NOT NULL,
    "deliverDate" TIMESTAMP(3) NOT NULL,
    "transporteur" TEXT NOT NULL,
    "utilisateur" TEXT NOT NULL,

    CONSTRAINT "lots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producteurs" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilPicture" TEXT NOT NULL,
    "nombreLots" INTEGER NOT NULL,
    "lots" INTEGER[],

    CONSTRAINT "producteurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transporteurs" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilPicture" TEXT NOT NULL,
    "numberDeliveredLot" INTEGER NOT NULL,
    "DeliveredLots" INTEGER[],

    CONSTRAINT "transporteurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilPicture" TEXT NOT NULL,
    "serialNumberObject" TEXT NOT NULL,
    "activation" BOOLEAN NOT NULL,
    "renewalDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "objets_barrecode_key" ON "objets"("barrecode");

-- CreateIndex
CREATE UNIQUE INDEX "objets_serialNumber_key" ON "objets"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "lots_lotNumber_key" ON "lots"("lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "producteurs_email_key" ON "producteurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "transporteurs_email_key" ON "transporteurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_serialNumberObject_key" ON "utilisateurs"("serialNumberObject");
