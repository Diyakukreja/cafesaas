'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { createCafeSchema, type CreateCafeInput } from '@/validations/cafe.schema'
import { cafeService } from '@/services/cafe-service'

export function CreateCafeDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [manuallyEditedSlug, setManuallyEditedSlug] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCafeInput>({
    resolver: zodResolver(createCafeSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  })

  const nameValue = watch('name')

  // Auto-generate slug from name if user hasn't manually edited it
  useEffect(() => {
    if (!manuallyEditedSlug && nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Replace special chars with hyphen
        .replace(/^-+|-+$/g, '')     // Remove leading/trailing hyphens

      setValue('slug', generatedSlug, { shouldValidate: true })
    } else if (!manuallyEditedSlug && !nameValue) {
      setValue('slug', '')
    }
  }, [nameValue, manuallyEditedSlug, setValue])

  async function onSubmit(data: CreateCafeInput) {
    setIsLoading(true)
    try {
      // 1. Verify slug uniqueness
      const isUnique = await cafeService.isSlugUnique(data.slug)
      if (!isUnique) {
        toast.error('This slug is already taken. Please choose another one.')
        setIsLoading(false)
        return
      }

      // 2. Create the cafe
      await cafeService.createCafe(data)
      
      toast.success('Cafe created successfully!')
      setOpen(false)
      reset()
      setManuallyEditedSlug(false)
      
      // 3. Refresh the page to hydrate SSR
      router.refresh()
    } catch (err) {
      const error = err as Error
      toast.error(error.message || 'Failed to create cafe.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle dialog open/close
  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      reset()
      setManuallyEditedSlug(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Cafe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new cafe</DialogTitle>
          <DialogDescription>
            Set up the foundation for your new cafe. You can change these details later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Cafe Name</Label>
            <Input
              id="name"
              placeholder="e.g. Downtown Roasters"
              disabled={isLoading}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              placeholder="e.g. downtown-roasters"
              disabled={isLoading}
              {...register('slug')}
              onChange={(e) => {
                setManuallyEditedSlug(true)
                // Also format on manual type to enforce rules natively
                const formatted = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, '')
                e.target.value = formatted
                setValue('slug', formatted, { shouldValidate: true })
              }}
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Your public menu will be at <strong>/c/{watch('slug') || '...'}</strong>
            </p>
            {errors.slug && (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your cafe..."
              className="resize-none"
              disabled={isLoading}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Cafe'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
