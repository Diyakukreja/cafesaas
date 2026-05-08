import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl shadow-zinc-200/20 dark:shadow-black/40">
        <div className="text-center">
          <Coffee className="w-10 h-10 text-indigo-600 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-zinc-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to manage your cafe
          </p>
        </div>
        
        <div className="mt-8">
          <LoginForm />
        </div>
        
        <div className="text-center text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Don&apos;t have an account? </span>
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
