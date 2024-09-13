-- Adminer 4.8.1 PostgreSQL 16.3 (Debian 16.3-1.pgdg120+1) dump

ALTER TABLE ONLY "public"."Funcionarios_Treinamentos" ADD CONSTRAINT "Funcionarios_Treinamentos_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionarios"(matricula) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."Funcionarios_Treinamentos" ADD CONSTRAINT "Funcionarios_Treinamentos_treinamentoId_fkey" FOREIGN KEY ("treinamentoId") REFERENCES "Treinamentos"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2024-09-13 00:06:13.654887+00
