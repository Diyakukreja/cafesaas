export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 min-h-screen relative">
        {children}
      </main>
    </div>
  )
}
