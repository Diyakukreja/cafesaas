import { createClient } from '@/lib/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'
import { MenuItem } from '@/types'
import { Database } from '@/types/database.types'

type MenuItemInsert = Database['public']['Tables']['menu_items']['Insert']
type MenuItemUpdate = Database['public']['Tables']['menu_items']['Update']

class MenuService {
  private getClient(client?: SupabaseClient) {
    return client || createClient()
  }

  async getMenuItems(cafeId: string, categoryId?: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    let query = supabase
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

  async createMenuItem(item: MenuItemInsert, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('menu_items')
      .insert(item)
      .select()
      .single()

    if (error) throw error
    return data as MenuItem
  }

  async updateMenuItem(id: string, updates: MenuItemUpdate, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as MenuItem
  }

  async deleteMenuItem(id: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export const menuService = new MenuService()
