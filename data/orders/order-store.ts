import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {Product} from "@/types/product";
import {Order} from "@/types/order";

interface ProductStore {
    orders: Order[]
    setOrders: (orders: Order[]) => void
}

export const useOrderStore = create<ProductStore>()(
    devtools(
        persist(
            (set) => ({
                orders: [],
                setOrders: (orders) => set((state) => ({orders: orders})),
            }),
            {
                name: 'order-storage',
            },
        ),
    ),
)