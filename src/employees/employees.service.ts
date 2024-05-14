import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/create-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: EmployeeDto) {
    const user_exists = await this.findOne(createEmployeeDto.matricula);

    if (user_exists) {
      throw new BadRequestException('funcionario ja existe');
    }

    return this.prisma.funcionarios.create({ data: createEmployeeDto });
  }

  async findOne(matricula: string) {
    return await this.prisma.funcionarios.findUnique({
      where: { matricula },
    });
  }

  async update(matricula: string, updateEmployeeDto: EmployeeDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { matricula: id, ...employee } = updateEmployeeDto;

    return await this.prisma.funcionarios.update({
      where: { matricula },
      data: { ...employee },
    });
  }

  async remove(matricula: string) {
    return await this.prisma.funcionarios.delete({ where: { matricula } });
  }
}
