import { t } from 'elysia'
import { server } from '@/utils/server'
import { Client } from '@/app/entities/client'

const client = new Client()

export const createClient = server.post(
  '/client',
  async ({ body, error }) => {
    const { name, city, completed, status } = body

    const createClient = await client.createClient({
      name,
      city,
      completed,
      status,
    })

    if (createClient.error) {
      return {
        status: error(400),
        error: createClient.error,
      }
    }

    if (createClient.client) {
      return {
        client: createClient.client,
      }
    }
  },
  {
    body: t.Object({
      name: t.String(),
      city: t.String(),
      status: t.String(),
      completed: t.Boolean(),
    }),
  }
)
