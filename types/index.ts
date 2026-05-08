// Base User and Tenant types

export interface User {
  id: string
  email: string
  role: 'admin' | 'tenant' | 'staff'
  created_at: string
}

export interface Cafe {
  id: string
  owner_id: string
  name: string
  slug: string
  description?: string | null
  logo_url?: string | null
  theme_color?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuCategory {
  id: string
  cafe_id: string
  name: string
  display_order: number
  is_active: boolean
  created_at: string
}

export interface MenuItem {
  id: string
  cafe_id: string
  category_id: string | null
  name: string
  description?: string | null
  price: number
  image_url?: string | null
  is_available: boolean
  is_featured: boolean
  is_veg: boolean
  preparation_time?: number | null
  created_at: string
  updated_at: string
}
