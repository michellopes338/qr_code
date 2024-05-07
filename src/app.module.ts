import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreinamentosModule } from './treinamentos/treinamentos.module';

@Module({
  imports: [TreinamentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
