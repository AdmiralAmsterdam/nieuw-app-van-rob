"use client";

import { create } from "zustand";

type CartItem = {
  productId: string;
  name: string;
  unit: string;
  pricePerUnit: number | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((x) => x.productId === item.productId);
      if (existing) {
        return {
          items: state.items.map((x) =>
            x.productId === item.productId
              ? { ...x, quantity: x.quantity + item.quantity }
              : x
          )
        };
      }
      return { items: [...state.items, item] };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.productId === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
  total: () =>
    get().items.reduce((acc, item) => {
      const price = item.pricePerUnit ?? 0;
      return acc + item.quantity * price;
    }, 0)
}));
