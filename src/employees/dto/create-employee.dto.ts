import { IsNotEmpty, IsNumberString, Length, MinLength } from 'class-validator';

export class EmployeeDto {
  @IsNumberString()
  @IsNotEmpty()
  @Length(8, 9)
  matricula: string;

  @IsNotEmpty()
  @MinLength(8)
  nome: string;

  constructor(partial: Partial<EmployeeDto>) {
    Object.assign(this, partial);
  }
}
