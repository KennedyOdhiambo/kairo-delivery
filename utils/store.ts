import { create } from 'zustand'
import { products } from 'data/products'

export type CartState = {
  cartItems: Record<string, { quantity: number; price: number; photo: string; name: string }>
  addToCart: (item: any) => void
  removeFromCart: (itemId: string) => void
  getTotalCost: () => number
}

export const useStore = create<CartState>((set, get) => ({
  cartItems: {},

  addToCart: (item: (typeof products)[number]['items'][number]) =>
    set((state: CartState) => {
      const itemId = item.name
      const existingItem = state.cartItems[itemId]

      return {
        cartItems: {
          ...state.cartItems,
          [itemId]: {
            quantity: existingItem ? existingItem.quantity + 1 : 1,
            price: item.price || 0,
            photo: item.image,
            name: item.name,
          },
        },
      }
    }),

  removeFromCart: (itemId: string) =>
    set((state: CartState) => {
      const existingItem = state.cartItems[itemId]
      if (!existingItem) return state

      if (existingItem.quantity === 1) {
        const newItems = { ...state.cartItems }
        delete newItems[itemId]
        return { cartItems: newItems }
      }

      return {
        cartItems: {
          ...state.cartItems,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          },
        },
      }
    }),

  getTotalCost: () => {
    const { cartItems } = get()
    return Object.values(cartItems).reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
}))
