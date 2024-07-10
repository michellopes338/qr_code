import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Treinamento } from './entities/treinamento.entity';
import { UpdateTreinamento } from './dto/update-treinamento.dto';

@Injectable()
export class TreinamentosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTreinamentoDto: Treinamento) {
    return await this.prisma.treinamentos.create({
      data: createTreinamentoDto,
    });
  }

  async findTreinamentoById(id: string) {
    const treinamento = await this.prisma.treinamentos.findUnique({
      where: { id },
    });

    if (!treinamento) throw new BadRequestException();

    return treinamento;
  }

  async findByMatricula(matricula: string) {
    const treinamentos = await this.prisma.funcionarios.findFirst({
      where: {
        matricula,
      },
      select: {
        nome: true,
        matricula: true,
        treinamentos: {
          select: {
            date_of_completion: true,
            treinamento: { select: { nome: true, validade: true } },
          },
        },
      },
    });

    if (treinamentos == null) {
      throw new NotFoundException('Funcionario não encontrado');
    }

    const treinamentos_formated = treinamentos.treinamentos.map((val) => {
      return {
        nome: val.treinamento.nome,
        validade: new Date(
          val.date_of_completion.setFullYear(
            val.date_of_completion.getFullYear() + val.treinamento.validade,
          ),
        ),
      };
    });

    const treinamentos_filtered = treinamentos_formated.filter((val) => {
      return val.validade > new Date();
    });

    return {
      funcionario: treinamentos.nome,
      matricula: treinamentos.matricula,
      treinamentos: [...treinamentos_filtered],
    };
  }

  async listTreinamentos(
    limit: string,
    offset: string,
    search?: string,
  ): Promise<Array<Treinamento>> {
    if (search) {
      return await this.prisma.treinamentos.findMany({
        take: parseInt(offset),
        skip: parseInt(limit),
        where: { nome: { contains: search, mode: 'insensitive' } },
      });
    }

    return await this.prisma.treinamentos.findMany({
      take: parseInt(offset),
      skip: parseInt(limit),
    });
  }

  async findByName(name: string) {
    const treinamentos = await this.prisma.funcionarios.findFirst({
      where: {
        nome: name,
      },
      select: {
        nome: true,
        matricula: true,
        treinamentos: {
          select: {
            date_of_completion: true,
            treinamento: { select: { nome: true, validade: true } },
          },
        },
      },
    });

    if (treinamentos == null) {
      throw new NotFoundException('Funcionario não encontrado');
    }

    const treinamentos_formated = treinamentos.treinamentos.map((val) => {
      return {
        nome: val.treinamento.nome,
        validade: new Date(
          val.date_of_completion.setFullYear(
            val.date_of_completion.getFullYear() + val.treinamento.validade,
          ),
        ),
      };
    });

    const treinamentos_filtered = treinamentos_formated.filter((val) => {
      return val.validade > new Date();
    });

    return {
      funcionario: treinamentos.nome,
      matricula: treinamentos.matricula,
      treinamentos: [...treinamentos_filtered],
    };
  }

  is_alphabetic(str: string): boolean {
    const regex = /^[a-zA-Z ]+$/;

    return regex.test(str);
  }

  async findOne(search: string) {
    // if has only letters ill treat like a name
    if (this.is_alphabetic(search)) {
      const treinamentos = await this.findByName(search);
      return treinamentos;
    }

    if (!this.is_alphabetic(search)) {
      const treinamentos = await this.findByMatricula(search);
      return treinamentos;
    }

    throw new BadRequestException('Nome ou Matricula invalidas');
  }

  async updateTreinamentoDe(
    matricula: string,
    updateTreinamento: Array<UpdateTreinamento>,
  ) {
    const user_exist = await this.prisma.funcionarios.findUnique({
      where: { matricula },
    });

    if (!user_exist) {
      throw new BadRequestException();
    }

    updateTreinamento.forEach(async (update_treinamento) => {
      await this.prisma.funcionarios_Treinamentos.upsert({
        where: {
          funcionarioId_treinamentoId: {
            funcionarioId: matricula,
            treinamentoId: update_treinamento.id,
          },
        },
        update: {
          date_of_completion: new Date(update_treinamento.realization_date),
        },
        create: {
          funcionarioId: matricula,
          treinamentoId: update_treinamento.id,
          date_of_completion: new Date(update_treinamento.realization_date),
        },
      });
    });

    return await this.findOne(matricula);
  }

  async update(id: string, updateTreinamentoDto: Partial<Treinamento>) {
    const exist = await this.findTreinamentoById(id);

    if (!exist) {
      throw new BadRequestException();
    }

    return await this.prisma.treinamentos.update({
      where: { id },
      data: updateTreinamentoDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.treinamentos.delete({ where: { id } });
  }
}
