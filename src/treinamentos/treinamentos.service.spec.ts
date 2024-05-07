import { Test, TestingModule } from '@nestjs/testing';
import { TreinamentosService } from './treinamentos.service';

describe('TreinamentosService', () => {
  let service: TreinamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreinamentosService],
    }).compile();

    service = module.get<TreinamentosService>(TreinamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
