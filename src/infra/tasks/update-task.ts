import { server } from '@/utils/server'
import { Tasks } from '@/app/entities/tasks'
import { Select } from '@/functions/select'

import { error, t } from 'elysia'

const tasks = new Tasks()
const select = new Select()

export const updateTask = server.put(
  '/update-task/:id',
  async ({ params, body }) => {
    const { id } = params
    const { clientId, completed, description, obs, status, types, updatedAt } =
      body

    !id && {
      status: error(400),
      error: 'Id não informado.',
    }

    !clientId && {
      status: error(400),
      error: 'Id do cliente não foi informado.',
    }

    const typesSelected = select.selectTypes(types as string)
    const statusSelected = select.selectStatus(status as string)

    if (!typesSelected && !statusSelected) {
      const update = await tasks.updateTask(
        {
          description,
          completed,
          obs,
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
    }

    if (!typesSelected && statusSelected) {
      const update = await tasks.updateTask(
        {
          description,
          completed,
          obs,
          status: statusSelected,
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
    }

    if (typesSelected && !statusSelected) {
      const update = await tasks.updateTask(
        {
          description,
          completed,
          obs,
          types: typesSelected,
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
    }

    if (typesSelected && statusSelected) {
      const update = await tasks.updateTask(
        {
          description,
          completed,
          obs,
          status: statusSelected,
          types: typesSelected,
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
    }

    return {
      message: 'Algo deu errado.',
      error: 'Não caiu em nenhuma das validações.',
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
