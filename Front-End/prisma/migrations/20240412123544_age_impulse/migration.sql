/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Objet" (
    "id" SERIAL NOT NULL,
    "barrecode" TEXT NOT NULL,
    "lotNumber" INTEGER NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "hardWareVersion" INTEGER NOT NULL,
    "firmWareVersion" INTEGER NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL,
    "lot" INTEGER NOT NULL,

    CONSTRAINT "Objet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lot" (
    "id" SERIAL NOT NULL,
    "lotNumber" INTEGER NOT NULL,
    "objectsNumber" INTEGER NOT NULL,
    "objects" INTEGER[],
    "productionDate" TIMESTAMP(3) NOT NULL,
    "recuperationDate" TIMESTAMP(3) NOT NULL,
    "deliverDate" TIMESTAMP(3) NOT NULL,
    "transporteur" TEXT NOT NULL,
    "utilisateur" TEXT NOT NULL,

    CONSTRAINT "Lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producteur" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilPicture" TEXT NOT NULL,
    "nombreLots" INTEGER NOT NULL,
    "lots" INTEGER[],

    CONSTRAINT "Producteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporteur" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilPicture" TEXT NOT NULL,
    "numberDeliveredLot" INTEGER NOT NULL,
    "DeliveredLots" INTEGER[],

    CONSTRAINT "Transporteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilPicture" TEXT NOT NULL,
    "serialNumberObject" TEXT NOT NULL,
    "activation" BOOLEAN NOT NULL,
    "renewalDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Objet_barrecode_key" ON "Objet"("barrecode");

-- CreateIndex
CREATE UNIQUE INDEX "Objet_serialNumber_key" ON "Objet"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Lot_lotNumber_key" ON "Lot"("lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Producteur_email_key" ON "Producteur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transporteur_email_key" ON "Transporteur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_serialNumberObject_key" ON "Utilisateur"("serialNumberObject");
