export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col p-4 space-y-4 animate-pulse">
      <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
      <div className="flex gap-2 overflow-hidden">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full flex-shrink-0"></div>
        ))}
      </div>
      <div className="space-y-4 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
