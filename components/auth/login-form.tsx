'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { loginSchema, type LoginInput } from '@/validations/auth.schema'
import { authService } from '@/services/auth-service'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [unverifiedEmail, setUnverifiedEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    try {
      await authService.login(data)
      toast.success('Successfully logged in')
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      const error = err as Error
      console.error(error)
      if (error.message?.toLowerCase().includes('email not confirmed')) {
        setNeedsVerification(true)
        setUnverifiedEmail(data.email)
        toast.error('Please verify your email address before logging in.')
      } else {
        toast.error(error.message || 'Failed to login. Please check your credentials.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function onResendVerification() {
    setIsLoading(true)
    try {
      await authService.resendVerification(unverifiedEmail)
      toast.success('Verification email resent! Please check your inbox.')
      setNeedsVerification(false)
    } catch (err) {
      const error = err as Error
      toast.error(error.message || 'Failed to resend verification email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </Button>

      {needsVerification && (
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800/50 mt-4 text-center">
          <p className="text-sm text-orange-800 dark:text-orange-300 mb-3">
            Your email is not verified yet.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            type="button"
            className="w-full border-orange-200 dark:border-orange-800/50 hover:bg-orange-100 dark:hover:bg-orange-900/40"
            onClick={onResendVerification}
            disabled={isLoading}
          >
            Resend verification email
          </Button>
        </div>
      )}
    </form>
  )
}
