import { server } from '@/utils/server'
import { error, t } from 'elysia'

import { Obras } from '@/app/entities/obras'

const obras = new Obras()

export const updateObras = server.post(
  '/obra/update/:id',
  async ({ params }) => {
    const { id } = params

    !id && {
      status: error(400),
    }

    const update = await obras.updateObra(id)

    if (update?.error) {
      return {
        status: error(400),
        error: update.error,
      }
    }

    return {
      message: update?.message,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
