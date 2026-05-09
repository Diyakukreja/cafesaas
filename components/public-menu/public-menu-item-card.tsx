'use client'

import { MenuItem } from '@/types'
import { Clock, Star, Leaf, Utensils, Heart, TrendingUp, Coffee } from 'lucide-react'
import { useMemo } from 'react'

interface PublicMenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function PublicMenuItemCard({ item, onClick }: PublicMenuItemCardProps) {
  const isSoldOut = !item.is_available

  // Personality Tags System (Emotional Design through Typography)
  const personalityTag = useMemo(() => {
    if (isSoldOut) return null
    if (item.is_featured) return { text: 'Chef\'s Pick', icon: Star, color: 'bg-amber-500' }
    if (item.is_veg) return { text: 'Pure Comfort', icon: Leaf, color: 'bg-emerald-500' }
    
    const tags = [
      { text: 'Regulars Love This', icon: Heart, color: 'bg-rose-500' },
      { text: 'Trending Now', icon: TrendingUp, color: 'bg-indigo-500' },
      { text: 'Perfect with Coffee', icon: Coffee, color: 'bg-orange-500' },
    ]
    const index = item.id.charCodeAt(0) % tags.length
    return tags[index]
  }, [item.id, item.is_featured, item.is_veg, isSoldOut])

  return (
    <div
      onClick={!isSoldOut ? onClick : undefined}
      className={`relative flex bg-white dark:bg-zinc-900 rounded-[20px] overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 cursor-pointer active:scale-[0.98] transition-transform ${
        isSoldOut ? 'opacity-60 grayscale-[0.5] cursor-not-allowed' : 'active:bg-zinc-50 dark:active:bg-zinc-800'
      }`}
    >
      {/* Emotional Tag */}
      {personalityTag && (
        <div className={`absolute top-0 right-0 z-10 px-3 py-1 ${personalityTag.color} text-white text-[9px] font-black uppercase tracking-widest rounded-bl-xl flex items-center gap-1`}>
          <personalityTag.icon className="w-2.5 h-2.5 fill-current" />
          {personalityTag.text}
        </div>
      )}

      {/* Image Section */}
      <div className="w-[100px] sm:w-[150px] flex-shrink-0 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
            <Utensils className="w-6 h-6 text-zinc-200 dark:text-zinc-800" />
          </div>
        )}
        
        {isSoldOut && (
          <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center z-10">
            <span className="bg-white text-zinc-900 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-[15px] sm:text-[17px] leading-tight tracking-tight line-clamp-2">
              {item.name}
            </h3>
            <span className="font-black text-zinc-900 dark:text-white text-sm sm:text-base" style={{ color: !isSoldOut ? 'var(--theme-color)' : undefined }}>
              ${Number(item.price).toFixed(2)}
            </span>
          </div>
          
          {item.description && (
            <p className="text-[12px] sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2 font-medium opacity-80 mt-1">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          {item.is_veg && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
              <Leaf className="w-2.5 h-2.5" />
              Veg
            </span>
          )}
          {item.preparation_time && (
            <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold ml-auto uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              {item.preparation_time}m
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
