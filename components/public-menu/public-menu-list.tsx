'use client'

import { useState } from 'react'
import { MenuCategory, MenuItem } from '@/types'
import { PublicMenuItemCard } from './public-menu-item-card'
import { PublicItemDetails } from './public-item-details'
import { PublicCategoryNav } from './public-category-nav'
import { motion } from 'framer-motion'

interface PublicMenuListProps {
  categoriesWithItems: (MenuCategory & { items: MenuItem[] })[]
}

export function PublicMenuList({ categoriesWithItems }: PublicMenuListProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  return (
    <>
      <PublicCategoryNav categories={categoriesWithItems} />

      {/* NUCLEAR DEBUG: Force high z-index and remove complex motion */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20 sm:space-y-32 pb-48 relative z-[100]">
        {categoriesWithItems.map((category) => (
          <section 
            key={category.id} 
            id={category.id}
            className="scroll-mt-40 relative z-[100] border-2 border-transparent"
          >
            <div className="flex items-end gap-4 mb-10 sm:mb-12">
              <div className="space-y-1">
                <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">
                  {category.name}
                </h2>
                <div className="h-1.5 w-24 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
              </div>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800/60 mb-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 relative z-[100]">
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
