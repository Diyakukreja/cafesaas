import { createClient } from '@/lib/supabase/client'
import { LoginInput, RegisterInput } from '@/validations/auth.schema'

class AuthService {
  // Use a getter to ensure the client is only initialized when needed.
  // This prevents module-level initialization errors during static site generation.
  private get supabase() {
    return createClient()
  }

  async login(data: LoginInput) {
    const { data: authData, error } = await this.supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw error
    return authData
  }

  async register(data: RegisterInput) {
    const { data: authData, error } = await this.supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) throw error
    return authData
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  async getUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    if (error) throw error
    return user
  }

  async resendVerification(email: string) {
    const { error } = await this.supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) throw error
  }
}

export const authService = new AuthService()
