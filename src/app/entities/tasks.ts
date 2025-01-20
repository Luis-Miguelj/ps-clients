import { taskSchema, type tasks } from '@/types/type-tasks'
import { prisma } from '@/utils/prisma'

interface TasksProps {
  description?: string
  types?: string
  status?: string
  obs?: string
  updatedAt?: Date
  completed?: boolean
}

export class Tasks {
  async createTasks(data: tasks) {
    const { clientId, obs, status, description, updatedAt, types } =
      taskSchema.parse(data)

    const client = await prisma.clients.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) {
      return {
        error: new Error('Cliente não encontrado'),
      }
    }

    try {
      await prisma.tasks.create({
        data: {
          clientId: client.id,
          obs,
          status,
          description,
          updatedAt,
          types,
          completed: false,
        },
      })

      return {
        message: 'Tarefa criada com sucesso',
      }
    } catch (err) {
      return {
        error: new Error('Erro ao criar tarefa'),
      }
    }
  }

  async getTasks(clientId: string) {
    !clientId && {
      error: new Error('Id do cliente não foi informado.'),
    }

    const tasks = await prisma.tasks.findMany({
      where: {
        clientId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!tasks) {
      return {
        error: new Error('Tarefas não encontradas'),
      }
    }

    return {
      tasks,
    }
  }

  async updateTask(data: TasksProps, taskId: string, clientId: string) {
    if (taskId === '' || clientId === '') {
      return {
        error: 'Id inválido.',
      }
    }

    const verifyClient = await prisma.clients.findUnique({
      where: {
        id: clientId,
      },
    })

    !verifyClient && {
      error: 'Cliente não encontrado.',
    }

    const update = await prisma.tasks.update({
      where: {
        id: taskId,
        clientId,
      },
      data: {
        description: data.description,
        completed: data.completed,
        obs: data.obs,
        status: data.status,
        types: data.types,
        updatedAt: data.updatedAt,
      },
    })

    !update && {
      error: {
        message: 'Erro ao editar a tarefa',
        obs: 'Id da task não encontrado.',
      },
    }

    return {
      message: 'task editada com sucesso.',
    }
  }

  async delelteTask(taskId: string) {
    const task = await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    })

    if (!task) {
      return {
        error: {
          message: 'Erro ao deletar a tarefa',
          obs: 'Id da task não encontrado.',
        },
      }
    }

    return {
      message: 'Tarefa deletada com sucesso.',
    }
  }
}
