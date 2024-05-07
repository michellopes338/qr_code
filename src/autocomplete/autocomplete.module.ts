import { Module } from '@nestjs/common';
import { AutocompleteService } from './autocomplete.service';
import { AutocompleteController } from './autocomplete.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AutocompleteController],
  providers: [AutocompleteService, PrismaService],
})
export class AutocompleteModule {}
