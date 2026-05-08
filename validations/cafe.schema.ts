import * as z from 'zod'

export const createCafeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(50, 'Slug must be at most 50 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(255, 'Description must be at most 255 characters').optional(),
})

export type CreateCafeInput = z.infer<typeof createCafeSchema>
