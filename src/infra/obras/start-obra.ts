import { server } from '@/utils/server'
import { error, t } from 'elysia'

import { Obras } from '@/app/entities/obras'

const obras = new Obras()

export const inicioObras = server.post(
  '/obras/start/:id',
  async ({ params }) => {
    const { id } = params

    !id && {
      status: error(400),
    }

    const start = await obras.start(id)

    if (start.error) {
      return {
        status: error(400),
        error: start.error,
      }
    }

    return {
      success: start.success,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
