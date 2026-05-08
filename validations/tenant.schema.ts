import { z } from 'zod'

export const tenantSchema = z.object({
  name: z.string().min(2, { message: 'Cafe name must be at least 2 characters' }),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    }),
  // Additional fields can be added here
})

export type TenantInput = z.infer<typeof tenantSchema>
