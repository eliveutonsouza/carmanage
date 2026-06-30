-- AlterTable User: add alertDaysBefore
ALTER TABLE "User" ADD COLUMN "alertDaysBefore" INTEGER NOT NULL DEFAULT 10;

-- AlterTable CarMaintenance: add cost, provider, notes
ALTER TABLE "CarMaintenance" ADD COLUMN "cost" DECIMAL(10,2);
ALTER TABLE "CarMaintenance" ADD COLUMN "provider" TEXT;
ALTER TABLE "CarMaintenance" ADD COLUMN "notes" TEXT;

-- CreateTable PasswordResetToken
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
