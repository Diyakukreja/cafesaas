import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { categoryService } from '@/services/category-service'
import { menuService } from '@/services/menu-service'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { PublicHeader } from '@/components/public-menu/public-header'
import { PublicCategoryNav } from '@/components/public-menu/public-category-nav'
import { PublicMenuItemCard } from '@/components/public-menu/public-menu-item-card'
import { AmbientBackground } from '@/components/ui/ambient-background'
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/motion'
import { Coffee } from 'lucide-react'

// Generate Dynamic Metadata for SEO
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
    title: `${cafe.name} | Menu`,
    description: cafe.description || `View the delicious menu for ${cafe.name}.`,
    openGraph: {
      title: `${cafe.name} | Menu`,
      description: cafe.description || `View the delicious menu for ${cafe.name}.`,
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

  // 1. Fetch Cafe Data
  const cafe = await cafeService.getCafeBySlug(slug, supabase).catch(() => null)

  // Escape hatch if cafe missing or inactive
  if (!cafe || !cafe.is_active) {
    notFound()
  }

  // 2. Fetch Categories & Menu Items in parallel
  const [allCategories, allItems] = await Promise.all([
    categoryService.getCategories(cafe.id, supabase).catch(() => []),
    menuService.getMenuItems(cafe.id, undefined, supabase).catch(() => []),
  ])

  // Filter down to active categories only
  const activeCategories = allCategories.filter((cat) => cat.is_active)

  // Group items locally. Only include items belonging to active categories.
  const categoriesWithItems = activeCategories.map((cat) => {
    return {
      ...cat,
      items: allItems.filter((item) => item.category_id === cat.id),
    }
  }).filter(cat => cat.items.length > 0) // Hide empty categories

  // Setup Theme Colors
  const themeColor = cafe.theme_color || '#4f46e5' // Default indigo-600

  return (
    <div 
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col relative z-0"
      style={{ '--theme-color': themeColor } as React.CSSProperties}
    >
      <AmbientBackground />
      <PublicHeader cafe={cafe} />

      {categoriesWithItems.length === 0 ? (
        <FadeIn className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-12 z-10 relative">
          <div className="w-20 h-20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-full flex items-center justify-center mb-4 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
            <Coffee className="w-8 h-8 text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Menu Coming Soon</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            {cafe.name} is still setting up their menu. Please check back later!
          </p>
        </FadeIn>
      ) : (
        <div className="relative z-10 flex-1 flex flex-col">
          <PublicCategoryNav categories={categoriesWithItems} />

          <StaggerContainer 
            delayChildren={0.3} 
            staggerChildren={0.1}
            className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20 pb-32"
          >
            {categoriesWithItems.map((category) => (
              <StaggerItem 
                key={category.id} 
                id={category.id}
                className="scroll-mt-40" // Offset for sticky nav + spacing
              >
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {category.name}
                  </h2>
                  <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800/60 mt-1"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {category.items.map((item) => (
                    <PublicMenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
      
      {/* Footer Branding */}
      <footer className="relative z-10 py-8 text-center text-zinc-400 dark:text-zinc-600 text-sm mt-auto font-medium">
        Powered by <strong className="text-zinc-900 dark:text-white">CafeSaaS</strong>
      </footer>
    </div>
  )
}
