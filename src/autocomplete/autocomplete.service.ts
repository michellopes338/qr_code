import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AutocompleteService {
  constructor(private readonly prisma: PrismaService) {}

  async autocomplete(search: string) {
    const values = await this.prisma.funcionarios.findMany({
      where: { nome: { startsWith: search, mode: 'insensitive' } },
      select: { nome: true, matricula: true },
    });

    return values;
  }
}
