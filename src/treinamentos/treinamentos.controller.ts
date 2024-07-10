import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { TreinamentosService } from './treinamentos.service';
import { Public } from 'src/decorators/public.decorators';
import { Treinamento } from './entities/treinamento.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { UpdateTreinamento } from './dto/update-treinamento.dto';

@Controller('treinamentos')
export class TreinamentosController {
  constructor(private readonly treinamentosService: TreinamentosService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async create(@Body() createTreinamentoDto: Treinamento) {
    return await this.treinamentosService.create(createTreinamentoDto);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async findTraining(@Param('id', ParseUUIDPipe) id: string) {
    return await this.treinamentosService.findTreinamentoById(id);
  }

  @Get('')
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async listTreinamentos(
    @Query('limit') limit = 0,
    @Query('offset') offset = 20,
    @Query('search') search?: string,
  ): Promise<Array<Treinamento>> {
    return await this.treinamentosService.listTreinamentos(
      limit,
      offset,
      search,
    );
  }

  @Public()
  @Get('de/:search')
  async findOne(@Param('search') search: string) {
    return this.treinamentosService.findOne(search);
  }

  @Patch('de/:matricula')
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async updateTreinamentoDe(
    @Param('matricula') matricula: string,
    @Body(new ParseArrayPipe({ items: UpdateTreinamento, whitelist: true }))
    updateTreinamento: Array<UpdateTreinamento>,
  ) {
    return await this.treinamentosService.updateTreinamentoDe(
      matricula,
      updateTreinamento,
    );
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTreinamentoDto: Partial<Treinamento>,
  ): Promise<Treinamento> {
    return await this.treinamentosService.update(id, updateTreinamentoDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.treinamentosService.remove(id);
  }
}
