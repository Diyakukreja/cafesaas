'use client'

import { MenuCategory } from '@/types'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export function PublicCategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id || '')
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Offset rootMargin to trigger when the heading is near the sticky nav
    const observer = new IntersectionObserver(
      (entries) => {
        // If we're manually scrolling from a click, ignore observer updates
        if (isScrollingRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveId(id)
            
            // Auto-scroll the nav container to keep active item in view (mobile friendly)
            const navBtn = document.getElementById(`nav-${id}`)
            if (navBtn) {
              navBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            }
          }
        })
      },
      { 
        // Trigger when section is in the top 40% of the screen
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      }
    )

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [categories])

  const scrollToCategory = (id: string) => {
    // 1. Block observer updates
    isScrollingRef.current = true
    setActiveId(id) 
    
    // 2. Perform the scroll
    const el = document.getElementById(id)
    if (el) {
      const offset = 140 // Matches our sticky nav height + padding
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }

    // 3. Keep active item in view in the nav bar
    const navBtn = document.getElementById(`nav-${id}`)
    if (navBtn) {
      navBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }

    // 4. Re-enable observer after scroll finishes (approx 800ms for smooth scroll)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }

  if (categories.length === 0) return null

  return (
    <div className="sticky top-0 z-[100] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl border-b border-zinc-200/50 dark:border-zinc-800/50 pt-3 pb-3 px-0 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-4xl mx-auto relative">
        {/* Soft edge gradients for horizontal scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none z-20 sm:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-20 sm:hidden"></div>

        <ul className="flex space-x-2 overflow-x-auto scrollbar-hide py-1 px-5 sm:px-0 snap-x snap-mandatory items-center no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeId === cat.id
            return (
              <li key={cat.id} className="flex-shrink-0 snap-start relative">
                <button
                  id={`nav-${cat.id}`}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`relative z-10 px-5 py-2.5 rounded-full text-[15px] font-bold transition-colors duration-300 select-none active:scale-95 ${
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
                    className="absolute inset-0 rounded-full shadow-lg z-0"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
