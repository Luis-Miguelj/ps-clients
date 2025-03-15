import { server } from '@/utils/server'
import { error, t } from 'elysia'
import { Client } from '@/app/entities/client'

const client = new Client()

export const deleteClient = server.delete(
  '/client/:id',
  async ({ params }) => {
    const { id } = params

    if (!id) {
      return {
        status: error(400),
        error: 'Id inválido',
      }
    }

    const deleteClient = await client.deleteClient(id)

    if (deleteClient.error) {
      return {
        status: error(400),
        error: deleteClient.error,
      }
    }

    return {
      message: deleteClient.success,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
