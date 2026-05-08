'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Something went wrong!</h2>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
        We&apos;re having trouble loading this menu right now. Please try again or ask the staff for a physical menu.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
