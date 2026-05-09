'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil } from 'lucide-react'

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

import { categorySchema, type CategoryInput } from '@/validations/menu.schema'
import { categoryService } from '@/services/category-service'
import { MenuCategory } from '@/types'

interface CategoryDialogProps {
  cafeId: string
  category?: MenuCategory
}

export function CategoryDialog({ cafeId, category }: CategoryDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = !!category

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      display_order: category?.display_order || 0,
      is_active: category?.is_active ?? true,
    },
  })

  // Update defaults if editing and prop changes
  useEffect(() => {
    if (category && open) {
      reset({
        name: category.name,
        display_order: category.display_order,
        is_active: category.is_active,
      })
    } else if (!category && open) {
      reset({
        name: '',
        display_order: 0,
        is_active: true,
      })
    }
  }, [category, open, reset])

  async function onSubmit(data: CategoryInput) {
    setIsLoading(true)
    try {
      if (isEditing) {
        await categoryService.updateCategory(category.id, data)
        toast.success('Category updated successfully')
      } else {
        await categoryService.createCategory({
          ...data,
          cafe_id: cafeId,
        })
        toast.success('Category created successfully')
      }
      
      setOpen(false)
      router.refresh()
    } catch (err) {
      const error = err as Error
      toast.error(error.message || 'Failed to save category')
    } finally {
      setIsLoading(false)
    }
  }

  const isActive = watch('is_active')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <DialogDescription>
            Categories help group your menu items together (e.g. &quot;Hot Drinks&quot;, &quot;Pastries&quot;).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g. Espresso Bar"
              disabled={isLoading}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm font-medium text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              disabled={isLoading}
              {...register('display_order', { valueAsNumber: true })}
            />
            {errors.display_order && (
              <p className="text-sm font-medium text-red-500">{errors.display_order.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="is_active" 
              className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600"
              disabled={isLoading}
              checked={isActive}
              onChange={(e) => setValue('is_active', e.target.checked)}
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Active (visible to customers)
            </Label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
