import { server } from '@/utils/server'

import { error, t } from 'elysia'
import { Obras } from '@/app/entities/obras'

const obras = new Obras()

export const endObra = server.post(
  '/obras/end/:id',
  async ({ params }) => {
    const { id } = params

    !id && {
      status: error(400),
    }

    const end = await obras.end(id)

    if (end.error) {
      return {
        status: error(400),
        error: end.error,
      }
    }

    return {
      success: end.success,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
