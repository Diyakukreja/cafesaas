'use client'

import { MenuItem } from '@/types'
import { MenuItemDialog } from './menu-item-dialog'
import { Clock, Image as ImageIcon } from 'lucide-react'

interface MenuItemCardProps {
  cafeId: string
  item: MenuItem
}

export function MenuItemCard({ cafeId, item }: MenuItemCardProps) {
  return (
    <div className={`group flex bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 ${!item.is_available ? 'opacity-70 bg-zinc-50 dark:bg-zinc-900/50' : ''}`}>
      {/* Admin Image Section */}
      <div className="w-[100px] sm:w-[130px] flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800"><svg class="w-6 h-6 text-zinc-300 dark:text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>`;
            }}
          />
        ) : (
          <ImageIcon className="w-6 h-6 text-zinc-300 dark:text-zinc-700" />
        )}
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-white/95 text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">Hidden</span>
          </div>
        )}
      </div>

      {/* Admin Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-zinc-900 dark:text-white line-clamp-1">{item.name}</h3>
            <span className="font-semibold text-zinc-900 dark:text-white">${Number(item.price).toFixed(2)}</span>
          </div>
          
          {item.description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {item.is_veg && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                🌱 Veg
              </span>
            )}
            {item.is_featured && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50">
                ⭐ Featured
              </span>
            )}
            {item.preparation_time && (
              <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                <Clock className="w-3 h-3" />
                {item.preparation_time}m
              </span>
            )}
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
            <MenuItemDialog cafeId={cafeId} categoryId={item.category_id || ''} item={item} />
          </div>
        </div>
      </div>
    </div>
  )
}
