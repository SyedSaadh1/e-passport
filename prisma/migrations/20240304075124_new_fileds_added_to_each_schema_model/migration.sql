-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "AdminAction" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CommunicationLog" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VerificationLog" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ePassportCard" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" INTEGER,
ADD COLUMN     "modifiedDate" TIMESTAMP(3);
