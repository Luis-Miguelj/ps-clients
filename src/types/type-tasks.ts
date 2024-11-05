import { z } from 'zod'

export const taskSchema = z.object({
  clientId: z.string(),
  description: z.string(),
  types: z.string(),
  obs: z.string().optional(),
  status: z.string(),
  updatedAt: z.date().optional(),
})

export type tasks = z.infer<typeof taskSchema>
