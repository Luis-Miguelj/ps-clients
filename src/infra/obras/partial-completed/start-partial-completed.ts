import { server } from '@/utils/server'
import { PartialCompleted } from '@/app/entities/partial-completed'
import { t } from 'elysia'

const partialCompleted = new PartialCompleted()

export const startPartialCompleted = server.post(
  '/obras/partial-completed/:id',
  async ({ body, params }) => {
    const { id } = params
    const { obs, inicio, fim } = body

    const data = await partialCompleted.partialCompletedTask({
      taskId: id,
      obs,
      inicio,
      fim,
    })

    if (data) {
      return {
        partialCompleted: data,
      }
    }

    return {
      message: 'Algo deu errado.',
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      obs: t.String(),
      inicio: t.Optional(t.Date()),
      fim: t.Optional(t.Date()),
    }),
  }
)
