import { prisma } from '@/utils/prisma'
import {
  type PartialCompletedTask,
  type UpdatePartialCompletedTask,
  updatePartialCompletedSchema,
  partialCompletedSchema,
} from '@/types/type-partial-completed'

export class PartialCompleted {
  async partialCompletedTask(data: PartialCompletedTask) {
    const { obs, taskId, inicio } = partialCompletedSchema.parse(data)

    if (!obs) {
      return new Error('Observação é obrigatória.')
    }

    if (!taskId) {
      return new Error('ID da tarefa é obrigatório.')
    }

    const partialCompleted = await prisma.partialCompletion.create({
      data: {
        obs,
        tasksId: taskId,
        inicio,
        completed: false,
      },
    })

    if (!partialCompleted) {
      return new Error('Erro ao finalizar tarefa parcialmente.')
    }

    return {
      message: 'Tarefa finalizada parcialmente com sucesso.',
      partialCompleteedTask: partialCompleted,
    }
  }

  async updatePartialCompletedTask(data: UpdatePartialCompletedTask) {
    const { id, obs, fim, inicio } = updatePartialCompletedSchema.parse(data)

    const update = await prisma.partialCompletion.update({
      where: {
        id,
      },
      data: {
        obs,
        fim,
        inicio,
      },
    })

    if (!update) {
      return new Error('Erro ao atualizar tarefa parcialmente.')
    }

    return {
      message: 'Tarefa atualizada com sucesso.',
      update,
    }
  }
}
