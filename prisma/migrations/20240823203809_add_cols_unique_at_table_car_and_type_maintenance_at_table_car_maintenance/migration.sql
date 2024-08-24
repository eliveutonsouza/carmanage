/*
  Warnings:

  - A unique constraint covering the columns `[plate]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[carId]` on the table `CarMaintenance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CarMaintenanceType" AS ENUM ('PREVENTIVA', 'CORRETIVA');

-- AlterTable
ALTER TABLE "CarMaintenance" ADD COLUMN     "type" "CarMaintenanceType" NOT NULL DEFAULT 'PREVENTIVA';

-- CreateIndex
CREATE UNIQUE INDEX "Car_plate_key" ON "Car"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Car_userId_key" ON "Car"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CarMaintenance_carId_key" ON "CarMaintenance"("carId");
