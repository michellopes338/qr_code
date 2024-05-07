import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreinamentosModule } from './treinamentos/treinamentos.module';
import { PrismaService } from './prisma.service';
import { AutocompleteModule } from './autocomplete/autocomplete.module';

@Module({
  imports: [TreinamentosModule, AutocompleteModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
