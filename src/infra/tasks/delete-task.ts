import { t } from 'elysia'
import { Tasks } from '@/app/entities/tasks'
import { server } from '@/utils/server'

const tasks = new Tasks()

export const deleteTask = server.delete(
  '/delete/:id',
  async ({ params }) => {
    const { id } = params

    const task = await tasks.delelteTask(id)

    if (task.error) {
      return {
        status: 400,
        message: task.error.message,
        obs: task.error.obs,
      }
    }

    return {
      message: task.message,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
