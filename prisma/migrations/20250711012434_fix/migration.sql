-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createUserId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createUserId_fkey" FOREIGN KEY ("createUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
