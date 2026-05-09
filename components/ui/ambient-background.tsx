'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AmbientBackground({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch on randomized blobs

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}>
      {/* Soft overlay to ensure readability */}
      <div className="absolute inset-0 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-[100px] z-10"></div>
      
      {/* Floating Ambient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.15] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, var(--theme-color) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.12] dark:opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--theme-color) 80%, white) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}
