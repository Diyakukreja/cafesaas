'use client'

import { useState } from 'react'
import { MenuCategory, MenuItem } from '@/types'
import { PublicMenuItemCard } from './public-menu-item-card'
import { PublicItemDetails } from './public-item-details'
import { PublicCategoryNav } from './public-category-nav'

interface PublicMenuListProps {
  categoriesWithItems: (MenuCategory & { items: MenuItem[] })[]
}

export function PublicMenuList({ categoriesWithItems }: PublicMenuListProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  return (
    <>
      <PublicCategoryNav categories={categoriesWithItems} />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24 pb-48">
        {categoriesWithItems.map((category) => (
          <section 
            key={category.id} 
            id={category.id}
            className="scroll-mt-32"
          >
            {/* Category Header (Stable Typography) */}
            <div className="flex items-end gap-4 mb-8 sm:mb-10">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">
                  {category.name}
                </h2>
                <div className="h-1 w-12 sm:w-16 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
              </div>
              <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800/50 mb-2.5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {category.items.map((item) => (
                <PublicMenuItemCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Item Details Modal */}
      <PublicItemDetails 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  )
}
