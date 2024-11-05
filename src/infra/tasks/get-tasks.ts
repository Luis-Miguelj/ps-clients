import { error, t } from 'elysia'

import { server } from '@/utils/server'
import { Tasks } from '@/app/entities/tasks'

const tasks = new Tasks()

export const getTasks = server.get(
  '/tasks/:id',
  async ({ params }) => {
    const { id } = params

    !id && {
      status: error(400),
      message: 'Id não informado',
    }

    const task = await tasks.getTasks(id)

    if (task.error) {
      return {
        status: error(400),
        message: task.error,
      }
    }

    return {
      tasks: task.tasks,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
