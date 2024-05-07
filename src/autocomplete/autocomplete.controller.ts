import { Controller, Get, Param } from '@nestjs/common';
import { AutocompleteService } from './autocomplete.service';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(private readonly autocompleteService: AutocompleteService) {}

  @Get(':search')
  async autocomplete(@Param('search') search: string) {
    return await this.autocompleteService.autocomplete(search);
  }
}
