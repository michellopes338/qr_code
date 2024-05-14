-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERUSER');

-- CreateTable
CREATE TABLE "Funcionarios" (
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Treinamentos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "validade" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "Treinamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionarios_Treinamentos" (
    "date_of_completion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "funcionarioId" TEXT NOT NULL,
    "treinamentoId" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_Treinamentos_pkey" PRIMARY KEY ("funcionarioId","treinamentoId")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "email" TEXT NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Treinamentos_nome_key" ON "Treinamentos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- AddForeignKey
ALTER TABLE "Funcionarios_Treinamentos" ADD CONSTRAINT "Funcionarios_Treinamentos_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionarios"("matricula") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionarios_Treinamentos" ADD CONSTRAINT "Funcionarios_Treinamentos_treinamentoId_fkey" FOREIGN KEY ("treinamentoId") REFERENCES "Treinamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
