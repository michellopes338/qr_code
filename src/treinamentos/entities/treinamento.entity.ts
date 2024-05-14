import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Treinamento {
  @Exclude({ toClassOnly: true })
  id: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  validade: number;

  constructor(partial: Partial<Treinamento>) {
    Object.assign(this, partial);
  }
}
