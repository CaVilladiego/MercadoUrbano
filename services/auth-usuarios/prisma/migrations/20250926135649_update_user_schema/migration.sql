/*
  Warnings:

  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `Apellido` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PrimerNombre` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Telefono` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Cliente', 'Vendedor', 'Administrador');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "fullName",
DROP COLUMN "role",
ADD COLUMN     "Apellido" TEXT NOT NULL,
ADD COLUMN     "PrimerNombre" TEXT NOT NULL,
ADD COLUMN     "Rol" "public"."Role" NOT NULL DEFAULT 'Cliente',
ADD COLUMN     "SegundoNombre" TEXT,
ADD COLUMN     "Telefono" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "Ciudad" TEXT NOT NULL,
    "Departamento" TEXT NOT NULL,
    "Pais" TEXT NOT NULL,
    "CodigoPostal" TEXT,
    "Referencia" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
