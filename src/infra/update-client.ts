import { server } from '@/utils/server'
import { updateClientSchema } from '@/types/type-client'
import { Client } from '@/app/entities/client'

import { t } from 'elysia'

const client = new Client()

export const updateClient = server.put(
  '/client/:id',
  async ({ params, body, error }) => {
    const { id } = params
    const { status, completed, updatedAt } = body

    if (!id) {
      return {
        status: error(400),
        message: 'Id não informado',
      }
    }

    const update = await client.updateClient({
      id,
      status,
      completed,
      updatedAt,
    })

    if (update.error) {
      return {
        status: error(400),
        message: update.error,
      }
    }

    return {
      status: 200,
      update_client: update.update_client,
    }
  },
  {
    body: t.Object({
      status: t.Optional(t.String()),
      completed: t.Optional(t.Boolean()),
      updatedAt: t.Optional(t.Date()),
    }),
    params: t.Object({
      id: t.String(),
    }),
  }
)
