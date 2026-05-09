'use client'

import { MenuCategory } from '@/types'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function PublicCategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id || '')

  useEffect(() => {
    // Offset rootMargin to trigger slightly before the heading hits the very top
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            
            // Auto-scroll the nav container to keep active item in view (mobile friendly)
            const navBtn = document.getElementById(`nav-${entry.target.id}`)
            if (navBtn) {
              navBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            }
          }
        })
      },
      { rootMargin: '-140px 0px -70% 0px' }
    )

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [categories])

  const scrollToCategory = (id: string) => {
    setActiveId(id) // Instant feedback
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130 // Offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (categories.length === 0) return null

  return (
    <div className="sticky top-0 z-40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 pt-3 pb-3 px-0 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        {/* Soft edge gradients for horizontal scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none z-10 sm:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-10 sm:hidden"></div>

        <ul className="flex space-x-2 overflow-x-auto scrollbar-hide py-1 px-5 sm:px-0 snap-x snap-mandatory items-center">
          {categories.map((cat) => {
            const isActive = activeId === cat.id
            return (
              <li key={cat.id} className="flex-shrink-0 snap-start relative">
                <button
                  id={`nav-${cat.id}`}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`relative z-10 px-5 py-2 rounded-full text-[15px] font-bold transition-colors duration-300 select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {cat.name}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full shadow-md"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
