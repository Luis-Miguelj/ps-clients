import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string(),
  city: z.string(),
  status: z.string(),
  completed: z.boolean(),
  userId: z.string().uuid(),
})

export const updateClientSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  completed: z.boolean().optional(),
  updatedAt: z.date().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
})

export type updateClient = z.infer<typeof updateClientSchema>

export type client = z.infer<typeof clientSchema>
