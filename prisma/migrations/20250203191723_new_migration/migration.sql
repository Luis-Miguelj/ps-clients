-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "obs" TEXT,
    "types" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransitoInicioDeObra" (
    "id" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chegada" TIMESTAMP(3),
    "tasksId" TEXT NOT NULL,

    CONSTRAINT "TransitoInicioDeObra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransitoFinalDeObra" (
    "id" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chegada" TIMESTAMP(3),
    "tasksId" TEXT NOT NULL,

    CONSTRAINT "TransitoFinalDeObra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartialCompletion" (
    "id" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "inicio" TIMESTAMP(3),
    "fim" TIMESTAMP(3),
    "tasksId" TEXT NOT NULL,

    CONSTRAINT "PartialCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obra" (
    "id" TEXT NOT NULL,
    "going_to_work" TIMESTAMP(3),
    "arriving_at_work" TIMESTAMP(3),
    "start_work" TIMESTAMP(3),
    "end_work" TIMESTAMP(3),
    "leaving_for_work" TIMESTAMP(3),
    "arriving_at_company" TIMESTAMP(3),
    "tasksId" TEXT NOT NULL,

    CONSTRAINT "Obra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitoInicioDeObra" ADD CONSTRAINT "TransitoInicioDeObra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitoFinalDeObra" ADD CONSTRAINT "TransitoFinalDeObra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartialCompletion" ADD CONSTRAINT "PartialCompletion_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obra" ADD CONSTRAINT "Obra_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
