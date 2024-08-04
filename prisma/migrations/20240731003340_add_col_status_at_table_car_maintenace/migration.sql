-- CreateEnum
CREATE TYPE "CarMaintenanceStatus" AS ENUM ('VENCIDA', 'CONFORME');

-- AlterTable
ALTER TABLE "CarMaintenance" ADD COLUMN     "status" "CarMaintenanceStatus" NOT NULL DEFAULT 'CONFORME';
