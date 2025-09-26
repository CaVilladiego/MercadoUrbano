-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "ciudad" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "codigoPostal" TEXT,
ADD COLUMN     "departamento" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "direccion" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pais" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "referencia" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
