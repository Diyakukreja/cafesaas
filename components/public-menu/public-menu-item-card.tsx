'use client'

import { MenuItem } from '@/types'
import { Clock, Star, Leaf, Utensils } from 'lucide-react'
import { motion } from 'framer-motion'

interface PublicMenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function PublicMenuItemCard({ item, onClick }: PublicMenuItemCardProps) {
  const isSoldOut = !item.is_available

  return (
    <div
      onClick={!isSoldOut ? onClick : undefined}
      // NUCLEAR DEBUG: Solid background, red border, high z-index, no overflow hidden
      className={`group relative flex bg-white dark:bg-zinc-900 rounded-[28px] shadow-2xl border-4 border-red-500 transition-all duration-300 cursor-pointer z-[150] ${
        isSoldOut ? 'opacity-60 grayscale-[0.5] cursor-not-allowed' : 'hover:shadow-xl'
      }`}
    >
      {/* Featured Ribbon */}
      {item.is_featured && !isSoldOut && (
        <div className="absolute top-0 right-0 z-[160] px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-white" />
          Featured
        </div>
      )}

      {/* Image Section */}
      <div className="w-[110px] sm:w-[160px] flex-shrink-0 bg-zinc-100 dark:bg-zinc-950 relative">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-800">
            <Utensils className="w-8 h-8 text-zinc-200 dark:text-zinc-700" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between relative z-[155]">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-black text-zinc-900 dark:text-zinc-50 text-base sm:text-lg leading-tight tracking-tight line-clamp-2">
              {item.name}
            </h3>
            <span className="font-black text-zinc-900 dark:text-white text-sm sm:text-base" style={{ color: !isSoldOut ? 'var(--theme-color)' : undefined }}>
              ${Number(item.price).toFixed(2)}
            </span>
          </div>
          
          {item.description && (
            <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2 font-medium opacity-100 mt-0.5">
              {item.description}
            </p>
          )}
        </div>

        {/* Dynamic Badges */}
        <div className="flex items-center gap-2 mt-3">
          {item.is_veg && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
              <Leaf className="w-2.5 h-2.5" />
              Veg
            </span>
          )}
          {item.preparation_time && (
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 font-bold ml-auto uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              {item.preparation_time} min
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
