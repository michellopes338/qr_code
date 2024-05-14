import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/create-employee.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from '@prisma/client';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Post()
  async create(@Body() createEmployeeDto: EmployeeDto) {
    return new EmployeeDto(
      await this.employeesService.create(createEmployeeDto),
    );
  }

  @Get(':matricula')
  @Roles(Role.ADMIN, Role.SUPERUSER)
  findOne(@Param('matricula') matricula: string) {
    return this.employeesService.findOne(matricula);
  }

  @Patch(':matricula')
  async update(
    @Param('matricula') matricula: string,
    @Body() updateEmployeeDto: EmployeeDto,
  ) {
    return await this.employeesService.update(matricula, updateEmployeeDto);
  }

  @Delete(':matricula')
  remove(@Param('matricula') matricula: string) {
    return this.employeesService.remove(matricula);
  }
}
