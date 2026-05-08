import Link from 'next/link'
import { Store, Settings } from 'lucide-react'
import { Cafe } from '@/types'

export function CafeCard({ cafe }: { cafe: Cafe }) {
  return (
    <Link 
      href={`/dashboard/${cafe.id}`} 
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-500/50 transition-all flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{ 
            backgroundColor: cafe.theme_color ? `${cafe.theme_color}20` : undefined,
            color: cafe.theme_color || undefined,
          }}
        >
          {cafe.logo_url ? (
            <img src={cafe.logo_url} alt={cafe.name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <Store className={`w-6 h-6 ${!cafe.theme_color ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
          )}
        </div>
        <div className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity">
          <Settings className="w-5 h-5" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1 line-clamp-1">
        {cafe.name}
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-1">
        {cafe.slug}
      </p>

      {cafe.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-auto">
          {cafe.description}
        </p>
      )}

      {!cafe.is_active && (
        <div className="mt-4 inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 self-start">
          Inactive
        </div>
      )}
    </Link>
  )
}
