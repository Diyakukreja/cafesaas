export default async function CafePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // In a real app, fetch tenant details from the DB here
  // const tenant = await tenantService.getTenantBySlug(slug)
  // if (!tenant) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cafe Header / Banner */}
      <header className="h-48 bg-indigo-600 relative flex items-end p-6">
        <h1 className="text-3xl font-bold text-white relative z-10 capitalize">
          {slug.replace('-', ' ')}
        </h1>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </header>
      
      {/* Menu Categories */}
      <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-20 overflow-x-auto whitespace-nowrap p-4 scrollbar-hide">
        <div className="flex gap-4">
          {['Coffee', 'Tea', 'Pastries', 'Sandwiches'].map((cat) => (
            <button key={cat} className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <main className="p-4 flex-1">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Coffee</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                  <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-900 dark:text-white">Espresso</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">Rich and bold double shot of our house blend.</p>
                    <div className="mt-2 font-semibold text-indigo-600 dark:text-indigo-400">$3.50</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
