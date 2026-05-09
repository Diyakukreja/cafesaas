import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { QrCode, Utensils, LayoutTemplate, Settings, ExternalLink, Activity, Sparkles, Heart, Coffee, Star } from 'lucide-react'
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
      title: 'Menu Curator',
      description: 'Craft your food categories and artisanal items',
      icon: <Utensils className="w-5 h-5" />,
      href: `/dashboard/${cafeId}/menu`,
      primary: true,
      color: 'bg-indigo-600',
    },
    {
      title: 'Table QRs',
      description: 'Generate high-quality placards for your tables',
      icon: <QrCode className="w-5 h-5" />,
      href: `/dashboard/${cafeId}/qr`,
      primary: false,
      color: 'bg-zinc-800',
    },
    {
      title: 'Cafe Identity',
      description: 'Update your logo, brand colors, and description',
      icon: <LayoutTemplate className="w-5 h-5" />,
      href: '#',
      primary: false,
      color: 'bg-zinc-800',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto relative z-0" style={{ '--theme-color': cafe.theme_color || '#4f46e5' } as React.CSSProperties}>
      <AmbientBackground />
      
      <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="relative z-10 space-y-12">
        
        {/* Cinematic Welcome Hero */}
        <StaggerItem className="relative overflow-hidden rounded-[48px] bg-zinc-950 p-8 sm:p-14 shadow-2xl border border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-zinc-950" />
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Coffee className="w-64 h-64 text-white rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-[40px] flex items-center justify-center text-white text-4xl font-black shadow-2xl rotate-3 border-4 border-white/10"
                style={{ backgroundColor: cafe.theme_color || '#4f46e5' }}
              >
                {cafe.name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/30">
                    Live Session
                  </span>
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Heart className="w-3 h-3 text-rose-500" />
                    Hospitality Active
                  </p>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                  {cafe.name}
                </h1>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/c/${cafe.slug}`}
                target="_blank"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-950 rounded-[24px] font-black uppercase tracking-tighter text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                <ExternalLink className="w-4 h-4" />
                View Customer Experience
              </Link>
            </div>
          </div>
        </StaggerItem>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Hospitality Actions */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter flex items-center gap-4 italic">
                <Activity className="w-8 h-8 text-indigo-500" />
                Management Console
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {actions.map((action, idx) => (
                <Link 
                  key={idx} 
                  href={action.href}
                  className="group relative flex flex-col p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className={`p-4 rounded-2xl inline-flex w-fit mb-6 text-white shadow-xl ${action.color}`}>
                    {action.icon}
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 tracking-tighter uppercase italic">
                    {action.title}
                  </h3>
                  <p className="text-base font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed opacity-80">
                    {action.description}
                  </p>
                  
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-500">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Setup & Hospitality Onboarding */}
          <div className="space-y-10">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter flex items-center gap-4 italic">
              <Star className="w-8 h-8 text-amber-500" />
              Onboarding
            </h2>
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[40px] p-10 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2 italic">Crafting Progress</p>
                    <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter italic">50%</span>
                  </div>
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/50">
                    Almost there
                  </span>
                </div>
                
                <div className="h-4 w-full bg-zinc-50 dark:bg-zinc-950 rounded-full mb-10 overflow-hidden border border-zinc-100 dark:border-zinc-900">
                  <div className="h-full bg-indigo-500 rounded-full w-1/2 shadow-lg shadow-indigo-500/40 transition-all duration-1000" />
                </div>

                <ul className="space-y-8">
                  {[
                    { name: 'Define Identity', done: true },
                    { name: 'Category Layout', done: true },
                    { name: 'Artisanal Items', done: false },
                    { name: 'Upload Brand Logo', done: false },
                  ].map((step, i) => (
                    <li key={i} className="flex items-center gap-6 group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black border-2 transition-all duration-500 ${
                        step.done 
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/30' 
                          : 'border-zinc-100 dark:border-zinc-800 text-transparent group-hover:border-zinc-300'
                      }`}>
                        {step.done ? '✓' : ''}
                      </div>
                      <span className={`text-base font-black tracking-tight uppercase italic ${
                        step.done ? 'text-zinc-300 dark:text-zinc-700 line-through' : 'text-zinc-900 dark:text-white'
                      }`}>
                        {step.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </StaggerContainer>
    </div>
  )
}
