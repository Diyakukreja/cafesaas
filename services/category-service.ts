import { createClient } from '@/lib/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'
import { MenuCategory } from '@/types'
import { Database } from '@/types/database.types'

type CategoryInsert = Database['public']['Tables']['menu_categories']['Insert']
type CategoryUpdate = Database['public']['Tables']['menu_categories']['Update']

class CategoryService {
  private getClient(client?: SupabaseClient) {
    return client || createClient()
  }

  async getCategories(cafeId: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('cafe_id', cafeId)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data as MenuCategory[]
  }

  async createCategory(category: CategoryInsert, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('menu_categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data as MenuCategory
  }

  async updateCategory(id: string, updates: CategoryUpdate, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('menu_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as MenuCategory
  }

  async deleteCategory(id: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { error } = await supabase
      .from('menu_categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export const categoryService = new CategoryService()
