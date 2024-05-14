export class AutocompleteEntity {
  matricula: string;
  nome: string;

  constructor(partial: Partial<AutocompleteEntity>) {
    Object.assign(this, partial);
  }
}
