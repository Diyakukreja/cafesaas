import { createClient } from '@/lib/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'
import { Cafe } from '@/types'
import { Database } from '@/types/database.types'

type CafeInsert = Database['public']['Tables']['cafes']['Insert']
type CafeUpdate = Database['public']['Tables']['cafes']['Update']

class CafeService {
  private getClient(client?: SupabaseClient) {
    return client || createClient()
  }

  async getMyCafes(client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('cafes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Cafe[]
  }

  async getCafeById(id: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('cafes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Cafe
  }

  async getCafeBySlug(slug: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('cafes')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as Cafe
  }

  async isSlugUnique(slug: string, client?: SupabaseClient): Promise<boolean> {
    const supabase = this.getClient(client)
    const { count, error } = await supabase
      .from('cafes')
      .select('id', { count: 'exact', head: true })
      .eq('slug', slug)

    if (error) throw error
    return count === 0
  }

  async createCafe(cafe: Omit<CafeInsert, 'owner_id'>, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('cafes')
      .insert({ ...cafe, owner_id: user.user.id })
      .select()
      .single()

    if (error) throw error
    return data as Cafe
  }

  async updateCafe(id: string, updates: CafeUpdate, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { data, error } = await supabase
      .from('cafes')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Cafe
  }

  async deleteCafe(id: string, client?: SupabaseClient) {
    const supabase = this.getClient(client)
    const { error } = await supabase
      .from('cafes')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export const cafeService = new CafeService()
