import { create } from 'zustand'
import { Cafe } from '@/types'

interface CafeState {
  activeCafe: Cafe | null
  setActiveCafe: (cafe: Cafe | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useCafeStore = create<CafeState>((set) => ({
  activeCafe: null,
  setActiveCafe: (cafe) => set({ activeCafe: cafe }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
