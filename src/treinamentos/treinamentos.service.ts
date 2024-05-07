import { Injectable } from '@nestjs/common';
import { CreateTreinamentoDto } from './dto/create-treinamento.dto';
import { UpdateTreinamentoDto } from './dto/update-treinamento.dto';

@Injectable()
export class TreinamentosService {
  create(createTreinamentoDto: CreateTreinamentoDto) {
    return 'This action adds a new treinamento';
  }

  findAll() {
    return `This action returns all treinamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} treinamento`;
  }

  update(id: number, updateTreinamentoDto: UpdateTreinamentoDto) {
    return `This action updates a #${id} treinamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} treinamento`;
  }
}
