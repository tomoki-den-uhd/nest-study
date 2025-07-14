/*
  Warnings:

  - You are about to drop the column `userName` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_userName_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userName",
ADD COLUMN     "productName" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");
