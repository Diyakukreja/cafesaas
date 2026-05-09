'use client'

import { MenuItem } from '@/types'
import { Clock, Image as ImageIcon } from 'lucide-react'

export function PublicMenuItemCard({ item }: { item: MenuItem }) {
  const isSoldOut = !item.is_available

  return (
    <div 
      className={`group flex bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-zinc-100 dark:border-zinc-800 transition-all duration-300 ${
        isSoldOut ? 'opacity-60 grayscale-[0.3]' : ''
      }`}
    >
      {/* Food-First Image Section */}
      <div className="w-[120px] sm:w-[160px] flex-shrink-0 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center relative overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            loading="lazy"
            onError={(e) => {
              // Graceful fallback for broken image links
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800"><svg class="w-8 h-8 text-zinc-300 dark:text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50">
            <ImageIcon className="w-8 h-8 text-zinc-300 dark:text-zinc-600/50" strokeWidth={1.5} />
          </div>
        )}
        
        {/* Soft Glassmorphism Sold Out overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-10">
            <span className="bg-white/95 text-zinc-900 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgb(0,0,0,0.15)]">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between relative">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-[17px] sm:text-[19px] leading-tight line-clamp-2 tracking-tight">
              {item.name}
            </h3>
            <span className="font-bold text-zinc-900 dark:text-white text-base sm:text-lg whitespace-nowrap">
              ${Number(item.price).toFixed(2)}
            </span>
          </div>
          
          {item.description && (
            <p className="text-[14px] sm:text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
              {item.description}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          {item.is_veg && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
              🌱 Veg
            </span>
          )}
          {item.is_featured && (
            <span 
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold border"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--theme-color) 8%, transparent)',
                color: 'color-mix(in srgb, var(--theme-color) 80%, black)', // Ensure readable contrast
                borderColor: 'color-mix(in srgb, var(--theme-color) 20%, transparent)'
              }}
            >
              ⭐ Featured
            </span>
          )}
          {item.preparation_time && (
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-medium ml-auto tracking-wide">
              <Clock className="w-3.5 h-3.5" />
              {item.preparation_time} min
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
