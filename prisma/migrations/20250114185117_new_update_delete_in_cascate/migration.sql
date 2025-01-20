-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_clientId_fkey";

-- DropForeignKey
ALTER TABLE "TransitoFinalDeObra" DROP CONSTRAINT "TransitoFinalDeObra_tasksId_fkey";

-- DropForeignKey
ALTER TABLE "TransitoInicioDeObra" DROP CONSTRAINT "TransitoInicioDeObra_tasksId_fkey";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitoInicioDeObra" ADD CONSTRAINT "TransitoInicioDeObra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitoFinalDeObra" ADD CONSTRAINT "TransitoFinalDeObra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
