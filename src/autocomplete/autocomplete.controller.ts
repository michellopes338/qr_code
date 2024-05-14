import { Controller, Get, Param } from '@nestjs/common';
import { AutocompleteService } from './autocomplete.service';
import { Public } from 'src/decorators/public.decorators';
import { AutocompleteEntity } from './dto/autocomplete.dto';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(private readonly autocompleteService: AutocompleteService) {}

  @Public()
  @Get()
  empty_autocomplete() {
    return [new AutocompleteEntity({ nome: '', matricula: '' })];
  }

  @Public()
  @Get(':search')
  async autocomplete(@Param('search') search: string) {
    return await this.autocompleteService.autocomplete(search);
  }
}
