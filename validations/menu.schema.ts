import * as z from 'zod'

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  display_order: z.number().int(),
  is_active: z.boolean(),
})

export type CategoryInput = z.infer<typeof categorySchema>

export const menuItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  description: z.string().max(500, 'Description must be at most 500 characters').optional().nullable(),
  price: z.number().min(0, 'Price cannot be negative'),
  image_url: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  is_available: z.boolean(),
  is_featured: z.boolean(),
  is_veg: z.boolean(),
  preparation_time: z.number().int().min(0).optional().nullable(),
  category_id: z.string().uuid('Must be a valid category').nullable().optional(),
})

export type MenuItemInput = z.infer<typeof menuItemSchema>
