'use client'

import { Cafe } from '@/types'
import { Star, Sparkles } from 'lucide-react'

export function PublicHeader({ cafe }: { cafe: Cafe }) {
  const themeStyle = {
    '--theme-base': 'var(--theme-color)',
  } as React.CSSProperties

  return (
    <header className="relative w-full bg-white dark:bg-zinc-950 overflow-hidden border-b border-zinc-100 dark:border-zinc-900" style={themeStyle}>
      {/* 
          STABILITY-FIRST: Simple Hero 
          No backdrop-filter or complex motion wrappers.
      */}
      <div className="relative py-12 sm:py-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-900/10" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo */}
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white dark:bg-zinc-900 p-1 shadow-sm border border-zinc-100 dark:border-zinc-800">
              {cafe.logo_url ? (
                <img 
                  src={cafe.logo_url} 
                  alt={cafe.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center bg-zinc-50 text-2xl font-black" style={{ color: 'var(--theme-base)' }}>
                  {cafe.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic mb-2 flex items-center gap-2">
            {cafe.name}
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          
          <p className="text-xs sm:text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
            Welcome to our table
          </p>
        </div>
      </div>

      {/* Description Area */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-center border-t border-zinc-50 dark:border-zinc-900/50">
        {cafe.description ? (
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto italic">
            "{cafe.description}"
          </p>
        ) : (
          <p className="text-sm font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
            Curated with care & comfort
          </p>
        )}
      </div>
    </header>
  )
}
