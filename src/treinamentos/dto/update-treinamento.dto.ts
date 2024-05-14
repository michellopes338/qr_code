import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTreinamento {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsDateString()
  realization_date: Date;

  constructor(partial: Partial<UpdateTreinamento>) {
    Object.assign(this, partial);
  }
}
