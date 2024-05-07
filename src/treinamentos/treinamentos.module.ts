import { Module } from '@nestjs/common';
import { TreinamentosService } from './treinamentos.service';
import { TreinamentosController } from './treinamentos.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TreinamentosController],
  providers: [TreinamentosService, PrismaService],
})
export class TreinamentosModule {}
