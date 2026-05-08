import { QrCode, Users, Coffee, TrendingUp } from 'lucide-react'

export default async function CafeDashboardPage({
  params,
}: {
  params: Promise<{ cafeId: string }>
}) {
  const { cafeId } = await params

  const stats = [
    { label: 'Total Orders', value: '1,234', icon: Coffee, trend: '+12%' },
    { label: 'Active Menus', value: '4', icon: QrCode, trend: 'Stable' },
    { label: 'Customers', value: '892', icon: Users, trend: '+5%' },
    { label: 'Revenue', value: '$12,450', icon: TrendingUp, trend: '+18%' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Cafe Overview</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Managing ID: {cafeId}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          )
        })}
      </div>
      
      {/* Additional dashboard widgets will go here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm min-h-[400px]">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Recent Activity</h3>
          {/* Chart or table placeholder */}
          <div className="flex items-center justify-center h-64 text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            Activity Chart
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm min-h-[400px]">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-zinc-700 dark:text-zinc-300">
              Download QR Code
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-zinc-700 dark:text-zinc-300">
              Edit Menu Items
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-zinc-700 dark:text-zinc-300">
              Manage Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
