-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "copies" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "resolvedDataJson" JSONB,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3);
