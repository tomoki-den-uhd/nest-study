-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
