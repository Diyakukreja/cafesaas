'use client'

import { Cafe } from '@/types'
import { MapPin, Clock } from 'lucide-react'

export function PublicHeader({ cafe }: { cafe: Cafe }) {
  // Use CSS color-mix to create beautiful soft gradients based on the theme color
  const themeStyle = {
    '--theme-base': 'var(--theme-color)',
    '--theme-light': 'color-mix(in srgb, var(--theme-color) 85%, white)',
    '--theme-dark': 'color-mix(in srgb, var(--theme-color) 80%, black)',
    '--theme-transparent': 'color-mix(in srgb, var(--theme-color) 15%, transparent)',
  } as React.CSSProperties

  return (
    <header className="relative bg-white dark:bg-zinc-950 overflow-hidden" style={themeStyle}>
      {/* Dynamic Lush Background */}
      <div 
        className="h-56 md:h-72 w-full relative"
        style={{ 
          background: 'linear-gradient(135deg, var(--theme-light), var(--theme-dark))',
        }}
      >
        {/* Soft Noise/Texture Overlay if desired (optional) */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-[2px]"></div>
        
        {/* Bottom subtle gradient fade into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative -mt-20 sm:-mt-24 pb-10 flex flex-col items-center text-center">
        {/* Premium Avatar Profile */}
        <div 
          className="w-28 h-28 sm:w-36 sm:h-36 bg-white dark:bg-zinc-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex items-center justify-center overflow-hidden mb-6 border-4 border-white dark:border-zinc-950 ring-1 ring-zinc-100 dark:ring-zinc-800"
        >
          {cafe.logo_url ? (
            <img 
              src={cafe.logo_url} 
              alt={`${cafe.name} logo`} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                // Graceful fallback if image breaks
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<span class="text-4xl sm:text-6xl font-bold" style="color: var(--theme-base)">${cafe.name.charAt(0).toUpperCase()}</span>`;
              }}
            />
          ) : (
            <span className="text-4xl sm:text-6xl font-bold" style={{ color: 'var(--theme-base)' }}>
              {cafe.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Cafe Identity */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
          {cafe.name}
        </h1>
        
        {cafe.description && (
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed mb-6 font-medium">
            {cafe.description}
          </p>
        )}

        {/* Optional Metadata pills (Location/Hours) - Future expansion, just skeleton for visual weight */}
        {/* 
        <div className="flex items-center justify-center gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4" /> Local Cafe
          </span>
          <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" /> Open Now
          </span>
        </div>
        */}
      </div>
    </header>
  )
}
