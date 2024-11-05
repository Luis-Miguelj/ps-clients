import { server } from '@/utils/server'
import { Tasks } from '@/app/entities/tasks'

import { error, t } from 'elysia'

const tasks = new Tasks()

export const updateTask = server.put(
  '/update-task/:id',
  async ({ params, body }) => {
    const { id } = params
    const { clientId, completed, description, obs, status, types, updatedAt } =
      body

    const typesTasks = await new Promise<string>((resolve, reject) => {
      switch (types) {
        case 'm':
          resolve('Manutenção')
          break
        case 'i':
          resolve('Instalação')
          break
        case 'o':
          resolve('O&M')
          break
        default:
          reject('Tipo de tarefa inválida')
          break
      }
    })

    !id && {
      status: error(400),
      error: 'Id não informado.',
    }

    !clientId && {
      status: error(400),
      error: 'Id do cliente não foi informado.',
    }

    const update = await tasks.updateTask(
      {
        description,
        completed,
        obs,
        status,
        types: typesTasks,
        updatedAt,
      },
      id,
      clientId
    )

    if (update.error) {
      return {
        status: error(400),
        error: update.error,
      }
    }

    return {
      message: update.message,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      clientId: t.String(),
      description: t.Optional(t.String()),
      completed: t.Optional(t.Boolean()),
      obs: t.Optional(t.String()),
      status: t.Optional(t.String()),
      types: t.Optional(t.String()),
      updatedAt: t.Optional(t.Date()),
    }),
  }
)
