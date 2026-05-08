import Link from 'next/link'
import { Coffee, ArrowRight } from 'lucide-react'

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Coffee className="w-6 h-6 text-indigo-600" />
          <span>CafeSaaS</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-zinc-600 hover:text-zinc-900 font-medium">
            Log in
          </Link>
          <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-20">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl mb-6">
          The future of <span className="text-indigo-600">Cafe management</span>
        </h1>
        <p className="text-lg text-zinc-600 max-w-2xl mb-10">
          Everything you need to run your cafe, from digital QR menus to inventory and analytics. Set up in minutes.
        </p>
        <Link href="/login" className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-colors text-lg">
          Start your free trial <ArrowRight className="w-5 h-5" />
        </Link>
      </main>
    </div>
  )
}
