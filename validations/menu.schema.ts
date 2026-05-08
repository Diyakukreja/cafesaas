import { z } from 'zod'

export const menuItemSchema = z.object({
  name: z.string().min(2, { message: 'Item name must be at least 2 characters' }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, { message: 'Price cannot be negative' }),
  is_available: z.boolean().default(true),
  image_url: z.string().url().optional().or(z.literal('')),
})

export type MenuItemInput = z.infer<typeof menuItemSchema>
