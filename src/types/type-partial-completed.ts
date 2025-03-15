import { z } from 'zod'

export const partialCompletedSchema = z.object({
  taskId: z.string().uuid(),
  obs: z
    .string()
    .min(5, { message: 'A observação deve conter no minimo 5 caracteres.' }),
  inicio: z.date().optional(),
  fim: z.date().optional(),
})

export const updatePartialCompletedSchema = z.object({
  id: z.string().uuid(),
  inicio: z.date().optional(),
  fim: z.date().optional(),
  obs: z
    .string()
    .min(5, { message: 'A observação deve conter no minimo 5 caracteres.' }),
})

export type UpdatePartialCompletedTask = z.infer<
  typeof updatePartialCompletedSchema
>
export type PartialCompletedTask = z.infer<typeof partialCompletedSchema>
