import { server } from '@/utils/server'
import { error, t } from 'elysia'

import { Client } from '@/app/entities/client'

const clients = new Client()

export const getClientById = server.get(
  '/client/:id',
  async ({ params }) => {
    const { id } = params

    !id && {
      status: error(400),
      message: 'Id não informado',
    }

    const client = await clients.getClientById(id)

    if (client.error) {
      return {
        status: error(400),
        message: client.error,
      }
    }

    return {
      client: client.client,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
