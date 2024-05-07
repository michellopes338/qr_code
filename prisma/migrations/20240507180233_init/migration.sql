-- CreateTable
CREATE TABLE "Funcionarios" (
    "matricula" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Treinamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "validade" INTEGER NOT NULL DEFAULT 2
);

-- CreateTable
CREATE TABLE "Funcionarios_Treinamentos" (
    "date_of_completion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "funcionarioId" TEXT NOT NULL,
    "treinamentoId" TEXT NOT NULL,

    PRIMARY KEY ("funcionarioId", "treinamentoId"),
    CONSTRAINT "Funcionarios_Treinamentos_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionarios" ("matricula") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Funcionarios_Treinamentos_treinamentoId_fkey" FOREIGN KEY ("treinamentoId") REFERENCES "Treinamentos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Treinamentos_nome_key" ON "Treinamentos"("nome");
