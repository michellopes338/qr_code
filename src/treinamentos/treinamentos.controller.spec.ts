import { Test, TestingModule } from '@nestjs/testing';
import { TreinamentosController } from './treinamentos.controller';
import { TreinamentosService } from './treinamentos.service';

describe('TreinamentosController', () => {
  let controller: TreinamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreinamentosController],
      providers: [TreinamentosService],
    }).compile();

    controller = module.get<TreinamentosController>(TreinamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
