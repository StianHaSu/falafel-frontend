import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {Product} from "@/types/product";

interface ProductStore {
    products: Product[]
    setProducts: (products: Product[]) => void
}

export const useProductStore = create<ProductStore>()(
    devtools(
        persist(
            (set) => ({
                products: [],
                setProducts: (products) => set((state) => ({products: products})),
            }),
            {
                name: 'product-storage',
            },
        ),
    ),
)