import { Obras } from '@/app/entities/obras'
import { server } from '@/utils/server'

import { t, error } from 'elysia'

const obra = new Obras()

export const getStatusObra = server.get(
  '/obra/status/:id',
  async ({ params }) => {
    const { id } = params

    if (!id) {
      return {
        message: 'Id não informado',
        status: error(400),
      }
    }

    const obras = await obra.getStartEnd(id)

    if (!obras) {
      return {
        message: 'Erro ao pegar o status da obra.',
        status: error(500),
      }
    }

    return {
      obra: {
        inicioDeObra: obras.inicio_de_obra,
        fimDeObra: obras.final_de_obra,
      },
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
