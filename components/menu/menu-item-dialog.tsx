'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Image as ImageIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { menuItemSchema, type MenuItemInput } from '@/validations/menu.schema'
import { menuService } from '@/services/menu-service'
import { MenuItem } from '@/types'

interface MenuItemDialogProps {
  cafeId: string
  categoryId: string
  item?: MenuItem
}

export function MenuItemDialog({ cafeId, categoryId, item }: MenuItemDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = !!item

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MenuItemInput>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
      image_url: item?.image_url || '',
      is_available: item?.is_available ?? true,
      is_featured: item?.is_featured ?? false,
      is_veg: item?.is_veg ?? false,
      preparation_time: item?.preparation_time || null,
      category_id: categoryId,
    },
  })

  useEffect(() => {
    if (item && open) {
      reset({
        name: item.name,
        description: item.description,
        price: item.price,
        image_url: item.image_url,
        is_available: item.is_available,
        is_featured: item.is_featured,
        is_veg: item.is_veg,
        preparation_time: item.preparation_time,
        category_id: categoryId,
      })
    } else if (!item && open) {
      reset({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        is_available: true,
        is_featured: false,
        is_veg: false,
        preparation_time: null,
        category_id: categoryId,
      })
    }
  }, [item, open, reset, categoryId])

  async function onSubmit(data: MenuItemInput) {
    setIsLoading(true)
    try {
      // Clean up empty strings to nulls
      const cleanData = {
        ...data,
        description: data.description || null,
        image_url: data.image_url || null,
        preparation_time: data.preparation_time || null,
      }

      if (isEditing) {
        await menuService.updateMenuItem(item.id, cleanData)
        toast.success('Item updated successfully')
      } else {
        await menuService.createMenuItem({
          ...cleanData,
          cafe_id: cafeId,
        })
        toast.success('Item created successfully')
      }
      
      setOpen(false)
      router.refresh()
    } catch (err) {
      const error = err as Error
      toast.error(error.message || 'Failed to save item')
    } finally {
      setIsLoading(false)
    }
  }

  const isAvailable = watch('is_available')
  const isFeatured = watch('is_featured')
  const isVeg = watch('is_veg')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                placeholder="e.g. Avocado Toast"
                disabled={isLoading}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm font-medium text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                disabled={isLoading}
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm font-medium text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preparation_time">Prep Time (mins)</Label>
              <Input
                id="preparation_time"
                type="number"
                min="0"
                placeholder="e.g. 5"
                disabled={isLoading}
                {...register('preparation_time', { valueAsNumber: true })}
              />
              {errors.preparation_time && (
                <p className="text-sm font-medium text-red-500">{errors.preparation_time.message}</p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="A delicious description..."
                className="resize-none h-20"
                disabled={isLoading}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  id="image_url"
                  placeholder="https://example.com/image.jpg"
                  className="pl-9"
                  disabled={isLoading}
                  {...register('image_url')}
                />
              </div>
              <p className="text-xs text-zinc-500">Provide a direct link to an image (optional)</p>
              {errors.image_url && (
                <p className="text-sm font-medium text-red-500">{errors.image_url.message}</p>
              )}
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-white">Properties</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="is_available" 
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600"
                  disabled={isLoading}
                  checked={isAvailable}
                  onChange={(e) => setValue('is_available', e.target.checked)}
                />
                <Label htmlFor="is_available" className="cursor-pointer font-normal">
                  In Stock
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="is_featured" 
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600"
                  disabled={isLoading}
                  checked={isFeatured}
                  onChange={(e) => setValue('is_featured', e.target.checked)}
                />
                <Label htmlFor="is_featured" className="cursor-pointer font-normal">
                  ⭐ Featured Item
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="is_veg" 
                  className="h-4 w-4 rounded border-zinc-300 text-green-600 focus:ring-green-600"
                  disabled={isLoading}
                  checked={isVeg}
                  onChange={(e) => setValue('is_veg', e.target.checked)}
                />
                <Label htmlFor="is_veg" className="cursor-pointer font-normal">
                  🌱 Vegetarian
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-zinc-950 p-4 -mx-4 -mb-4 border-t border-zinc-200 dark:border-zinc-800">
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
              {isEditing ? 'Save Changes' : 'Add Item'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
