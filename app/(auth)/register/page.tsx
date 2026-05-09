import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { RegisterForm } from '@/components/auth/register-form'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl shadow-zinc-200/20 dark:shadow-black/40 border border-zinc-100 dark:border-zinc-800">
        <div className="text-center">
          <Coffee className="w-10 h-10 text-indigo-600 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Start managing your digital cafe experience
          </p>
        </div>
        
        <div className="mt-8">
          <RegisterForm />
        </div>
        
        <div className="text-center text-sm pt-4">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Already have an account? </span>
          <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
