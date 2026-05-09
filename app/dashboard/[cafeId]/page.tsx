import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { QrCode, Utensils, LayoutTemplate, Settings, ExternalLink, Activity } from 'lucide-react'

export default async function CafeDashboardPage({
  params,
}: {
  params: Promise<{ cafeId: string }>
}) {
  const { cafeId } = await params
  const supabase = await createClient()

  const cafe = await cafeService.getCafeById(cafeId, supabase).catch(() => null)
  if (!cafe) {
    redirect('/dashboard')
  }

  // Quick action links
  const actions = [
    {
      title: 'Menu Builder',
      description: 'Manage your categories and items',
      icon: <Utensils className="w-5 h-5" />,
      href: `/dashboard/${cafeId}/menu`,
      primary: true,
    },
    {
      title: 'QR Code & Print',
      description: 'Download table placards',
      icon: <QrCode className="w-5 h-5" />,
      href: '#', // TODO: Implement QR generator
      primary: false,
    },
    {
      title: 'Cafe Identity',
      description: 'Update logo, theme, and hours',
      icon: <LayoutTemplate className="w-5 h-5" />,
      href: '#', // TODO: Implement settings
      primary: false,
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Premium Header */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-inner"
            style={{ backgroundColor: cafe.theme_color || '#4f46e5' }}
          >
            {cafe.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {cafe.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Live and active</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/c/${cafe.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View Public Menu
          </Link>
        </div>
      </div>

      {/* Operational Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Workspace Actions */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {actions.map((action, idx) => (
              <Link 
                key={idx} 
                href={action.href}
                className={`group flex flex-col p-5 rounded-2xl border transition-all duration-200 ${
                  action.primary 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700' 
                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className={`p-2.5 rounded-xl inline-flex w-fit mb-4 ${
                  action.primary 
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                }`}>
                  {action.icon}
                </div>
                <h3 className={`font-bold mb-1 ${action.primary ? 'text-indigo-950 dark:text-indigo-100' : 'text-zinc-900 dark:text-white'}`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${action.primary ? 'text-indigo-700/80 dark:text-indigo-300/80' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Setup Checklist Widget */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-zinc-400" />
            Setup Progress
          </h2>
          
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">Completion</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">2/4</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-1/2"></div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-[10px]">✓</div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 line-through">Create cafe identity</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-[10px]">✓</div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 line-through">Add first menu category</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-zinc-200 dark:border-zinc-800"></div>
                <span className="text-sm font-medium text-zinc-900 dark:text-white">Add 5+ menu items</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-zinc-200 dark:border-zinc-800"></div>
                <span className="text-sm font-medium text-zinc-900 dark:text-white">Upload cafe logo</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
