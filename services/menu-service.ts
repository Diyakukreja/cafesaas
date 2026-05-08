import { createClient } from '@/lib/supabase/client'
import { MenuItem } from '@/types'
import { Database } from '@/types/database.types'

type MenuItemInsert = Database['public']['Tables']['menu_items']['Insert']
type MenuItemUpdate = Database['public']['Tables']['menu_items']['Update']

class MenuService {
  private supabase = createClient()

  async getMenuItems(cafeId: string, categoryId?: string) {
    let query = this.supabase
      .from('menu_items')
      .select('*')
      .eq('cafe_id', cafeId)
      .order('created_at', { ascending: false })

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) throw error
    return data as MenuItem[]
  }

  async createMenuItem(item: MenuItemInsert) {
    const { data, error } = await this.supabase
      .from('menu_items')
      .insert(item)
      .select()
      .single()

    if (error) throw error
    return data as MenuItem
  }

  async updateMenuItem(id: string, updates: MenuItemUpdate) {
    const { data, error } = await this.supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as MenuItem
  }

  async deleteMenuItem(id: string) {
    const { error } = await this.supabase
      .from('menu_items')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export const menuService = new MenuService()
