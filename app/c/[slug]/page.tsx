import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { categoryService } from '@/services/category-service'
import { menuService } from '@/services/menu-service'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { PublicHeader } from '@/components/public-menu/public-header'
import { PublicMenuList } from '@/components/public-menu/public-menu-list'
import { AmbientBackground } from '@/components/ui/ambient-background'
import { FadeIn } from '@/components/ui/motion'
import { Coffee } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const cafe = await cafeService.getCafeBySlug(slug, supabase).catch(() => null)

  if (!cafe || !cafe.is_active) {
    return { title: 'Cafe Not Found' }
  }

  return {
    title: `${cafe.name} | Premium Menu`,
    description: cafe.description || `Explore our curated selection of food and drinks at ${cafe.name}.`,
    openGraph: {
      title: `${cafe.name} | Live Menu`,
      description: cafe.description || `Check out our latest menu items.`,
      images: cafe.logo_url ? [cafe.logo_url] : [],
    },
  }
}

export default async function PublicCafePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const cafe = await cafeService.getCafeBySlug(slug, supabase).catch(() => null)

  if (!cafe || !cafe.is_active) {
    notFound()
  }

  const [allCategories, allItems] = await Promise.all([
    categoryService.getCategories(cafe.id, supabase).catch(() => []),
    menuService.getMenuItems(cafe.id, undefined, supabase).catch(() => []),
  ])

  const activeCategories = allCategories.filter((cat) => cat.is_active)

  const categoriesWithItems = activeCategories.map((cat) => {
    return {
      ...cat,
      items: allItems.filter((item) => item.category_id === cat.id),
    }
  }).filter(cat => cat.items.length > 0)

  const themeColor = cafe.theme_color || '#4f46e5'

  return (
    <div 
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col relative z-0"
      style={{ '--theme-color': themeColor } as React.CSSProperties}
    >
      {/* NUCLEAR DEBUG: Disable Background */}
      {/* <AmbientBackground /> */}
      
      <PublicHeader cafe={cafe} />

      {categoriesWithItems.length === 0 ? (
        <FadeIn className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-12 z-10 relative">
          <div className="w-24 h-24 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 shadow-2xl border border-white/20">
            <Coffee className="w-10 h-10 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tighter">Menu Coming Soon</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-medium">
            Our chefs are preparing something special. Stay tuned!
          </p>
        </FadeIn>
      ) : (
        <div className="relative z-[50] flex-1 flex flex-col">
          <PublicMenuList categoriesWithItems={categoriesWithItems} />
        </div>
      )}
      
      {/* Premium Footer Branding */}
      <footer className="relative z-10 py-12 text-center text-zinc-400 dark:text-zinc-600 text-xs mt-auto">
        <div className="mb-4 opacity-30">
          <div className="h-px w-24 bg-current mx-auto mb-4" />
        </div>
        <p className="font-bold tracking-widest uppercase">
          Powered by <span className="text-zinc-900 dark:text-white">CafeSaaS</span>
        </p>
        <p className="mt-1 opacity-60">Digital Operating System for Modern Cafes</p>
      </footer>
    </div>
  )
}
