'use client'

import { MenuItem } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Leaf, Star, Info } from 'lucide-react'

interface PublicItemDetailsProps {
  item: MenuItem | null
  onClose: () => void
}

export function PublicItemDetails({ item, onClose }: PublicItemDetailsProps) {
  if (!item) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Content Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-80 w-full bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
            {item.image_url ? (
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Info className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
              </div>
            )}
            
            {/* Visual Badges overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {item.is_veg && (
                <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Leaf className="w-3 h-3" />
                  Vegetarian
                </div>
              )}
              {item.is_featured && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                {item.name}
              </h2>
              <span className="text-2xl font-black text-zinc-900 dark:text-white" style={{ color: 'var(--theme-color)' }}>
                ${Number(item.price).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 font-medium mb-6">
              {item.preparation_time && (
                <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm">
                  <Clock className="w-4 h-4" />
                  {item.preparation_time} min
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm">
                Available Now
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Description</h4>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {item.description || "No description provided for this item."}
              </p>
            </div>

            {/* Placeholder for future variants/add-ons */}
            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-sm text-center text-zinc-400 font-medium">
                Browsing from Table 1
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
