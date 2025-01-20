/*
  Warnings:

  - Made the column `tasksId` on table `TransitoFinalDeObra` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tasksId` on table `TransitoInicioDeObra` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TransitoFinalDeObra" DROP CONSTRAINT "TransitoFinalDeObra_tasksId_fkey";

-- DropForeignKey
ALTER TABLE "TransitoInicioDeObra" DROP CONSTRAINT "TransitoInicioDeObra_tasksId_fkey";

-- AlterTable
ALTER TABLE "TransitoFinalDeObra" ALTER COLUMN "tasksId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TransitoInicioDeObra" ALTER COLUMN "tasksId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TransitoInicioDeObra" ADD CONSTRAINT "TransitoInicioDeObra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitoFinalDeObra" ADD CONSTRAINT "TransitoFinalDeObra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
