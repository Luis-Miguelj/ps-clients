import { server } from '@/utils/server'
import { taskSchema } from '@/types/type-tasks'
import { Tasks } from '@/app/entities/tasks'
import { error, t } from 'elysia'

const tasks = new Tasks()

export const createTask = server.post(
  '/task',
  async ({ body }) => {
    const { clientId, obs, status, description, updatedAt, types } =
      taskSchema.parse(body)

    const typeTasks = await new Promise<string>((resolve, reject) => {
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

    const statusTask = await new Promise<string>((resolve, reject) => {
      switch (status) {
        case 'i':
          resolve('Incompleta')
          break
        case 'c':
          resolve('Completa')
          break
        case 'a':
          resolve('Em andamento')
          break
        default:
          reject('Status inválido')
          break
      }
    })

    const task = await tasks.createTasks({
      clientId,
      obs,
      status: statusTask,
      description,
      updatedAt,
      types: typeTasks,
    })

    if (task.error) {
      return {
        status: error(400),
        body: task.error.message,
      }
    }

    return {
      message: task.message,
    }
  },
  {
    body: t.Object({
      clientId: t.String(),
      description: t.String(),
      types: t.String(),
      obs: t.Optional(t.String()),
      status: t.String(),
      updatedAt: t.Optional(t.Date()),
    }),
  }
)
