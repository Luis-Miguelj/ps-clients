import { z } from 'zod'

export const obraSchema = z.object({
  taskId: z.string().uuid(),
  goingToWork: z.date().optional(),
  arrivingAtWork: z.date().optional(),
  workStarted: z.date().optional(),
  workEnded: z.date().optional(),
  leavingWork: z.date().optional(),
  arrivingAtCompany: z.date().optional(),
})

export type Obra = z.infer<typeof obraSchema>
