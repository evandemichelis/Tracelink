-- AlterTable
ALTER TABLE "utilisateurs" ALTER COLUMN "serialNumberObject" SET DEFAULT '',
ALTER COLUMN "activation" SET DEFAULT false,
ALTER COLUMN "renewalDate" DROP NOT NULL;
