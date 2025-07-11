-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginAt" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
