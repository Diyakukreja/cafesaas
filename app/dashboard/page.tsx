import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { CafeCard } from '@/components/cafes/cafe-card'
import { CreateCafeDialog } from '@/components/cafes/create-cafe-dialog'
import { Coffee } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const cafes = await cafeService.getMyCafes(supabase)

  if (cafes.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner">
          <Coffee className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Welcome to CafeSaaS
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
          Let&apos;s get started by creating your very first cafe. You&apos;ll be able to manage your menus, themes, and orders from your dashboard.
        </p>
        <div className="flex justify-center">
          <CreateCafeDialog />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Your Cafes</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Select a cafe to manage or create a new one.</p>
        </div>
        <CreateCafeDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </div>
    </div>
  )
}
