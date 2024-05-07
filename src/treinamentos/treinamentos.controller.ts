import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreinamentosService } from './treinamentos.service';
import { CreateTreinamentoDto } from './dto/create-treinamento.dto';
import { UpdateTreinamentoDto } from './dto/update-treinamento.dto';

@Controller('treinamentos')
export class TreinamentosController {
  constructor(private readonly treinamentosService: TreinamentosService) {}

  @Post()
  create(@Body() createTreinamentoDto: CreateTreinamentoDto) {
    return this.treinamentosService.create(createTreinamentoDto);
  }

  @Get()
  findAll() {
    return this.treinamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treinamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreinamentoDto: UpdateTreinamentoDto) {
    return this.treinamentosService.update(+id, updateTreinamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treinamentosService.remove(+id);
  }
}
