'use client'

import { MenuCategory } from '@/types'
import { useEffect, useState } from 'react'

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
    <div className="sticky top-0 z-40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 pt-3 pb-3 px-0 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <ul className="flex space-x-3 overflow-x-auto scrollbar-hide py-1 px-5 sm:px-0 snap-x snap-mandatory items-center">
          {categories.map((cat) => {
            const isActive = activeId === cat.id
            return (
              <li key={cat.id} className="flex-shrink-0 snap-start">
                <button
                  id={`nav-${cat.id}`}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-300 ease-out select-none ${
                    isActive
                      ? 'shadow-md text-white scale-105'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                  style={isActive ? { backgroundColor: 'var(--theme-color)' } : {}}
                >
                  {cat.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
