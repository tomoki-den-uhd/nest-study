-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "lastLoginAt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "createUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createUserId_fkey" FOREIGN KEY ("createUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
