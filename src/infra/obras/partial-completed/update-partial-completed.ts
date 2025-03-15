import { server } from '@/utils/server'
import {
  updatePartialCompletedSchema,
  type UpdatePartialCompletedTask,
} from '@/types/type-partial-completed'

import { t } from 'elysia'

import { PartialCompleted } from '@/app/entities/partial-completed'
const partialCompleted = new PartialCompleted()

export const updatePartialCompleted = server.put(
  '/obras/partial-completed/update/id',
  async ({ params: { id }, body }) => {
    const data = updatePartialCompletedSchema.parse({ id, ...body })

    const update = await partialCompleted.updatePartialCompletedTask(data)

    if (update instanceof Error) {
      return {
        message: 'Algo deu errado ao atualizar.',
      }
    }

    return {
      message: update.message,
      data: update.update,
    }
  },
  {
    body: t.Object({
      obs: t.String(),
      inicio: t.Optional(t.Date()),
      fim: t.Optional(t.Date()),
    }),
    params: t.Object({
      id: t.String(),
    }),
  }
)
