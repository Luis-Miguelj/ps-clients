import { prisma } from '@/utils/prisma'
export class Obras {
  async start(id: string) {
    if (!id) {
      return {
        error: 'Id não informado',
      }
    }

    const inicioObra = await prisma.transitoInicioDeObra.create({
      data: {
        tasksId: id,
      },
    })

    if (!inicioObra) {
      return {
        error: 'Erro ao dar início a obra.',
      }
    }

    return {
      success: 'Obra iniciada com sucesso.',
    }
  }

  async end(id: string) {
    if (!id) {
      return {
        error: 'Id não informado',
      }
    }

    const fimObra = await prisma.transitoFinalDeObra.create({
      data: {
        tasksId: id,
      },
    })

    if (!fimObra) {
      return {
        error: 'Erro ao finalizar a obra.',
      }
    }

    return {
      success: 'Obra finalizada com sucesso.',
    }
  }

  async updateObra(id: string) {
    if (!id) {
      return {
        error: 'Id não informado',
      }
    }

    const obraInicio = await prisma.transitoInicioDeObra.findUnique({
      where: {
        id: id,
      },
    })

    if (!obraInicio) {
      const obraFinal = await prisma.transitoFinalDeObra.findUnique({
        where: {
          id: id,
        },
      })

      !obraFinal && {
        error: 'Obra não encontrada.',
      }

      const updateObraFinal = await prisma.transitoFinalDeObra.update({
        where: {
          id: obraFinal?.id,
        },
        data: {
          fim: new Date(),
        },
      })

      if (updateObraFinal) {
        return {
          message: 'Obra atualizada com sucesso.',
        }
      }
    }

    const updateObraInicio = await prisma.transitoInicioDeObra.update({
      where: {
        id: obraInicio?.id,
      },
      data: {
        fim: new Date(),
      },
    })

    if (updateObraInicio) {
      return {
        message: 'Obra atualizada com sucesso.',
      }
    }
  }

  async getStartEnd(id: string) {
    if (!id) {
      return {
        error: 'Id não informado',
      }
    }

    const obraInicio = await prisma.transitoInicioDeObra.findFirst({
      where: {
        tasksId: id,
      },
    })

    const obraFinal = await prisma.transitoFinalDeObra.findFirst({
      where: {
        tasksId: id,
      },
    })

    !obraFinal && {
      error: 'Obra não encontrada.',
    }

    return {
      inicio_de_obra: {
        id: obraInicio?.id,
        inicio: obraInicio?.inicio,
        fim: obraInicio?.fim,
      },
      final_de_obra: {
        id: obraFinal?.id,
        inicio: obraFinal?.inicio,
        fim: obraFinal?.fim,
      },
    }
  }
}
