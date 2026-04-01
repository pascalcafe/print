-- DropForeignKey
ALTER TABLE "UserTenant" DROP CONSTRAINT "UserTenant_roleId_fkey";

-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "canceledById" TEXT,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "reprintOfJobId" TEXT,
ADD COLUMN     "retryCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "templateVersion" INTEGER;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "lastPublishedVersion" INTEGER;

-- AlterTable
ALTER TABLE "TemplateDataField" ADD COLUMN     "description" TEXT,
ADD COLUMN     "fallbackValue" TEXT,
ADD COLUMN     "formatConfigJson" JSONB,
ADD COLUMN     "formatType" TEXT;

-- AlterTable
ALTER TABLE "TemplateVersion" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "UserTenant" ADD CONSTRAINT "UserTenant_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateVersion" ADD CONSTRAINT "TemplateVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_canceledById_fkey" FOREIGN KEY ("canceledById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_reprintOfJobId_fkey" FOREIGN KEY ("reprintOfJobId") REFERENCES "PrintJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
