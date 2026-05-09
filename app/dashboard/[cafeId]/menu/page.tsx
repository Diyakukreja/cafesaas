import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { categoryService } from '@/services/category-service'
import { menuService } from '@/services/menu-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, GripVertical } from 'lucide-react'

import { CategoryDialog } from '@/components/menu/category-dialog'
import { MenuItemDialog } from '@/components/menu/menu-item-dialog'
import { MenuItemCard } from '@/components/menu/menu-item-card'

export default async function MenuManagementPage({
  params,
}: {
  params: Promise<{ cafeId: string }>
}) {
  const { cafeId } = await params
  const supabase = await createClient()

  // 1. Validate ownership
  const cafe = await cafeService.getCafeById(cafeId, supabase).catch(() => null)
  if (!cafe) {
    redirect('/dashboard')
  }

  // 2. Fetch Categories and Items concurrently
  const [categories, allItems] = await Promise.all([
    categoryService.getCategories(cafeId, supabase),
    menuService.getMenuItems(cafeId, undefined, supabase),
  ])

  // Group items by category locally to save DB roundtrips
  const itemsByCategory = categories.map((cat) => ({
    ...cat,
    items: allItems.filter((item) => item.category_id === cat.id),
  }))

  const uncategorizedItems = allItems.filter((item) => !item.category_id)

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href={`/dashboard/${cafeId}`}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Menu Management</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Editing {cafe.name} • Changes save instantly
          </p>
        </div>
      </div>

      {/* Main Workspace Actions */}
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {categories.length} Categories • {allItems.length} Items
        </p>
        <CategoryDialog cafeId={cafeId} />
      </div>

      {/* Categories Rendering */}
      {categories.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No Categories Yet</h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
            Start by adding categories like &quot;Hot Drinks&quot; or &quot;Pastries&quot; to organize your menu.
          </p>
          <CategoryDialog cafeId={cafeId} />
        </div>
      ) : (
        <div className="space-y-12">
          {itemsByCategory.map((category) => (
            <div key={category.id} className="space-y-4 relative group">
              
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <div className="flex items-center gap-3">
                  <div className="text-zinc-300 dark:text-zinc-600 cursor-move hover:text-zinc-500 transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                    {category.name}
                    {!category.is_active && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        Hidden
                      </span>
                    )}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <MenuItemDialog cafeId={cafeId} categoryId={category.id} />
                  <CategoryDialog cafeId={cafeId} category={category} />
                </div>
              </div>

              {/* Items Grid */}
              {category.items.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">This category is empty.</p>
                  <MenuItemDialog cafeId={cafeId} categoryId={category.id} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <MenuItemCard key={item.id} cafeId={cafeId} item={item} />
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Uncategorized Items (if any orphaned items exist) */}
          {uncategorizedItems.length > 0 && (
            <div className="space-y-4 opacity-70">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Uncategorized</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uncategorizedItems.map((item) => (
                  <MenuItemCard key={item.id} cafeId={cafeId} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
