import { PartialType } from '@nestjs/mapped-types';
import { CreateTreinamentoDto } from './create-treinamento.dto';

export class UpdateTreinamentoDto extends PartialType(CreateTreinamentoDto) {}
