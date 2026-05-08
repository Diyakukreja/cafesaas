import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function CafeDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ cafeId: string }>
}) {
  const { cafeId: _cafeId } = await params
  const supabase = await createClient()

  // Validate ownership via RLS. If the cafe doesn't exist or doesn't belong to the user,
  // RLS will return zero rows, resulting in an error or null data.
  const { data: cafe, error } = await supabase
    .from('cafes')
    .select('id')
    .eq('id', _cafeId)
    .single()

  if (error || !cafe) {
    redirect('/dashboard')
  }

  return (
    <div>
      {children}
    </div>
  )
}
