'use client'

import { Cafe } from '@/types'
import { FadeIn } from '@/components/ui/motion'
import { UtensilsCrossed, Star } from 'lucide-react'

export function PublicHeader({ cafe }: { cafe: Cafe }) {
  const themeStyle = {
    '--theme-base': 'var(--theme-color)',
    '--theme-light': 'color-mix(in srgb, var(--theme-color) 85%, white)',
    '--theme-dark': 'color-mix(in srgb, var(--theme-color) 80%, black)',
    '--theme-transparent': 'color-mix(in srgb, var(--theme-color) 15%, transparent)',
  } as React.CSSProperties

  return (
    <header className="relative w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden" style={themeStyle}>
      {/* Cinematic Hero Section */}
      <div className="relative h-[280px] md:h-[400px] w-full">
        {/* Layered Gradient & Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${cafe.logo_url || ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) saturate(1.2)',
            transform: 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-50 dark:to-zinc-950" />
        
        {/* Center Branding Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6">
          <FadeIn y={40} duration={0.8} className="flex flex-col items-center text-center">
            {/* Premium Logo Ring */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-110" />
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-zinc-900 p-1 shadow-2xl relative z-10 border border-white/50">
                {cafe.logo_url ? (
                  <img 
                    src={cafe.logo_url} 
                    alt={cafe.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-zinc-100 text-3xl font-bold" style={{ color: 'var(--theme-base)' }}>
                    {cafe.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
              {cafe.name}
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </h1>
            
            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 font-semibold text-sm sm:text-base">
              <span className="flex items-center gap-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                <UtensilsCrossed className="w-4 h-4" />
                Premium Menu
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-zinc-400">Open Daily</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Description Area */}
      <div className="max-w-4xl mx-auto px-6 pt-2 pb-10 text-center">
        {cafe.description && (
          <FadeIn delay={0.2} y={20}>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-2xl mx-auto italic opacity-90">
              "{cafe.description}"
            </p>
          </FadeIn>
        )}
      </div>
    </header>
  )
}
