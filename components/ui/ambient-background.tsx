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
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-10] ${className}`}>
      {/* Dynamic Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Primary Readability Layer - Reduced Z-Index to avoid blocking content */}
      <div className="absolute inset-0 bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-[100px] z-[1]" />
      
      {/* Animated Mesh Blobs - Lower opacity for better mobile rendering */}
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -100, 150, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-[0.15] dark:opacity-[0.08] z-0"
        style={{
          background: 'radial-gradient(circle, var(--theme-color) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 100, -150, 0],
          scale: [1, 0.8, 1.2, 1],
          rotate: [360, 180, 90, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] rounded-full opacity-[0.1] dark:opacity-[0.06] z-0"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--theme-color) 70%, white) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
    </div>
  )
}
