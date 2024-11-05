import { server } from '@/utils/server'
import { Client } from '@/app/entities/client'

import { t } from 'elysia'

const client = new Client()

export const updateClient = server.put(
  '/client/:id',
  async ({ params, body, error }) => {
    const { id } = params
    const { status, completed, updatedAt, city, name } = body

    if (!id) {
      return {
        status: error(400),
        message: 'Id não informado',
      }
    }

    const statusOptions = await new Promise<string>((resolve, reject) => {
      switch (status) {
        case 'a':
          resolve('Em andamento')
          break
        case 'c':
          resolve('Completo')
          break
        case 'i':
          resolve('Incompleto')
          break
        default:
          reject('Status inválido')
      }
    })

    if (statusOptions === 'Status inválido') {
      return {
        status: error(400),
        error: statusOptions,
      }
    }

    const update = await client.updateClient({
      id,
      name,
      city,
      completed,
      updatedAt,
      status: statusOptions,
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
      name: t.Optional(t.String()),
      city: t.Optional(t.String()),
    }),
    params: t.Object({
      id: t.String(),
    }),
  }
)
