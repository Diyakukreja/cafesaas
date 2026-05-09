'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AmbientBackground({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}>
      {/* Cinematic Grain Overlay (Very Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Warm Ambient Radial Light (Safe for Mobile) */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-100/20 via-white to-white dark:from-zinc-900/20 dark:via-zinc-950 dark:to-zinc-950" />
      
      {/* Moving Atmospheric Blobs (Optimized) */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-0 left-0 w-[100%] h-[100%] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--theme-color) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-0 right-0 w-[100%] h-[100%] rounded-full"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--theme-color) 40%, white) 0%, transparent 60%)',
          filter: 'blur(150px)',
        }}
      />
    </div>
  )
}
