import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { QrCode, Utensils, LayoutTemplate, Settings, ExternalLink, Activity, Sparkles } from 'lucide-react'
import { AmbientBackground } from '@/components/ui/ambient-background'
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/motion'

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

  const actions = [
    {
      title: 'Menu Builder',
      description: 'Manage your live categories and food items',
      icon: <Utensils className="w-5 h-5" />,
      href: `/dashboard/${cafeId}/menu`,
      primary: true,
      color: 'bg-indigo-600',
    },
    {
      title: 'QR Placards',
      description: 'Generate and print table-aware QR codes',
      icon: <QrCode className="w-5 h-5" />,
      href: `/dashboard/${cafeId}/qr`,
      primary: false,
      color: 'bg-zinc-800',
    },
    {
      title: 'Branding',
      description: 'Update your cafe logo, theme and description',
      icon: <LayoutTemplate className="w-5 h-5" />,
      href: '#',
      primary: false,
      color: 'bg-zinc-800',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto relative z-0" style={{ '--theme-color': cafe.theme_color || '#4f46e5' } as React.CSSProperties}>
      <AmbientBackground />
      
      <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="relative z-10 space-y-10">
        
        {/* Dynamic Hero Section */}
        <StaggerItem className="relative overflow-hidden rounded-[40px] bg-zinc-950 p-8 sm:p-12 shadow-2xl border border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-zinc-950" />
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-48 h-48 text-white rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl rotate-3 border-4 border-white/10"
                style={{ backgroundColor: cafe.theme_color || '#4f46e5' }}
              >
                {cafe.name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase italic">
                  {cafe.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Operation Live</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/c/${cafe.slug}`}
                target="_blank"
                className="group flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-tighter text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                <ExternalLink className="w-4 h-4" />
                Live Menu
              </Link>
            </div>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Actions Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
                <Activity className="w-6 h-6 text-indigo-500" />
                Management Console
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {actions.map((action, idx) => (
                <Link 
                  key={idx} 
                  href={action.href}
                  className="group relative flex flex-col p-6 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className={`p-3 rounded-2xl inline-flex w-fit mb-5 text-white shadow-lg ${action.color}`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight uppercase">
                    {action.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed opacity-80">
                    {action.description}
                  </p>
                  
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Setup Progress Sidebar */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
              <Settings className="w-6 h-6 text-zinc-400" />
              Onboarding
            </h2>
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Status</p>
                  <span className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">50%</span>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">2 of 4</span>
              </div>
              
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-1/2 shadow-lg shadow-indigo-500/50" />
              </div>

              <ul className="space-y-6">
                {[
                  { name: 'Cafe Identity', done: true },
                  { name: 'Menu Categories', done: true },
                  { name: 'Menu Items', done: false },
                  { name: 'Cafe Logo', done: false },
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                      step.done 
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                        : 'border-zinc-200 dark:border-zinc-800 text-transparent group-hover:border-zinc-400'
                    }`}>
                      {step.done ? '✓' : ''}
                    </div>
                    <span className={`text-sm font-bold tracking-tight uppercase ${
                      step.done ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-white'
                    }`}>
                      {step.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </StaggerContainer>
    </div>
  )
}
