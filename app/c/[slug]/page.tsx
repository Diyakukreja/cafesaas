import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { categoryService } from '@/services/category-service'
import { menuService } from '@/services/menu-service'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { PublicHeader } from '@/components/public-menu/public-header'
import { PublicMenuList } from '@/components/public-menu/public-menu-list'
import { FadeIn } from '@/components/ui/motion'
import { Utensils } from 'lucide-react'

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
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col"
      style={{ '--theme-color': themeColor } as React.CSSProperties}
    >
      {/* 
        STABILITY-FIRST: Removed AmbientBackground entirely to prevent 
        mobile rendering regressions caused by fixed/blur overlays.
      */}
      
      <PublicHeader cafe={cafe} />

      {categoriesWithItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-12">
          <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <Utensils className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tighter italic">Menu Coming Soon</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-medium">
            Our chefs are perfecting the recipes. Check back shortly!
          </p>
        </div>
      ) : (
        <main className="flex-1">
          <PublicMenuList categoriesWithItems={categoriesWithItems} />
        </main>
      )}
      
      {/* Premium Footer Branding */}
      <footer className="py-16 text-center text-zinc-400 dark:text-zinc-600 text-[10px] mt-auto border-t border-zinc-100 dark:border-zinc-900/50">
        <p className="font-black tracking-[0.3em] uppercase mb-1">
          Powered by <span className="text-zinc-900 dark:text-white">CafeSaaS</span>
        </p>
        <p className="opacity-60 font-bold uppercase tracking-widest">Digital Hospitality Operating System</p>
      </footer>
    </div>
  )
}
