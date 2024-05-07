import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TreinamentosService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createTreinamentoDto: CreateTreinamentoDto) {
  //   return 'This action adds a new treinamento';
  // }

  // findAll() {
  //   return `This action returns all treinamentos`;
  // }

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

  // update(id: number, updateTreinamentoDto: UpdateTreinamentoDto) {
  //   return `This action updates a #${id} treinamento`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} treinamento`;
  // }
}
