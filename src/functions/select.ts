export class Select {
  selectTypes(types: string): string | null {
    switch (types) {
      case 'm':
        return 'Manutenção'
      case 'i':
        return 'Instalação'
      case 'o':
        return 'O&M'
      default:
        return null
    }
  }

  selectStatus(status: string): string | null {
    switch (status) {
      case 'i':
        return 'Incompleta'
      case 'c':
        return 'Completa'
      case 'a':
        return 'Em Andamento'
      default:
        return null
    }
  }
}
