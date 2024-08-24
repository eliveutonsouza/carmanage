-- CreateTable
CREATE TABLE "ReportCarMaintenanceHistory" (
    "id" TEXT NOT NULL,
    "nameReport" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ReportCarMaintenanceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportCarMaintenanceHistory" ADD CONSTRAINT "ReportCarMaintenanceHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
