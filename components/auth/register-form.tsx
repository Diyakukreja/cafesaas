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

import { registerSchema, type RegisterInput } from '@/validations/auth.schema'
import { authService } from '@/services/auth-service'

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true)
    try {
      await authService.register(data)
      setRegisteredEmail(data.email)
      setIsSuccess(true)
      toast.success('Account created successfully! Check your email to verify.')
    } catch (err) {
      const error = err as Error
      console.error(error)
      if (error.message?.includes('already registered')) {
         toast.error('An account with this email already exists.')
      } else {
         toast.error(error.message || 'Failed to register account. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function onResendVerification() {
    setIsLoading(true)
    try {
      await authService.resendVerification(registeredEmail)
      toast.success('Verification email resent! Please check your inbox.')
    } catch (err) {
      const error = err as Error
      toast.error(error.message || 'Failed to resend verification email.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
          <p className="font-medium mb-1">Check your email</p>
          <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80">
            We sent a verification link to <strong>{registeredEmail}</strong>.
          </p>
        </div>
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onResendVerification}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Resend verification email
          </Button>
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => router.push('/login')}
          >
            Back to login
          </Button>
        </div>
      </div>
    )
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
          autoComplete="new-password"
          disabled={isLoading}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  )
}
