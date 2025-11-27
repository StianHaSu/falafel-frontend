import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {Product, ProductCategory} from "@/types/product";

interface ProductStore {
    products: Product[];
    shadowProducts: Product[];
    setProducts: (products: Product[]) => void;
    setShadowProducts: (products: Product[]) => void;
    resetShadowProduct: (productId: string) => void;
    setProductName: (productId: string, name: string) => void;
    setProductPrice: (productId: string, price: number) => void;
    setProductDescription: (productId: string, description: string) => void;
    setProductCategories: (productId: string, categories: ProductCategory[]) => void;
}

export const useProductStore = create<ProductStore>()(
    devtools(
        persist(
            (set) => ({
                products: [],
                shadowProducts: [],
                setProducts: (products) => set({ products: products }),
                setShadowProducts: (products) => set({ shadowProducts: products }),
                resetShadowProduct: (productId) =>
                    set((state) => {
                        const original = state.products.find(p => p.id === productId);
                        if (!original) return state;
                        return {
                            shadowProducts: [
                                ...state.shadowProducts.filter(p => p.id !== productId),
                                { ...original },
                            ],
                        };
                    }),
                setProductName: (productId, name) =>
                    set((state) => ({
                        shadowProducts: state.shadowProducts.map(p =>
                            p.id === productId ? { ...p, name } : p
                        ),
                    })),
                setProductPrice: (productId, price) =>
                    set((state) => ({
                        shadowProducts: state.shadowProducts.map(p =>
                            p.id === productId ? { ...p, price } : p
                        ),
                    })),
                setProductDescription: (productId, description) =>
                    set((state) => ({
                        shadowProducts: state.shadowProducts.map(p =>
                            p.id === productId ? { ...p, description } : p
                        ),
                    })),
                setProductCategories: (productId, categories) =>
                    set((state) => ({
                        shadowProducts: state.shadowProducts.map(p =>
                            p.id === productId ? { ...p, categories } : p
                        ),
                    })),
            }),
            {
                name: 'product-storage',
            },
        ),
    ),
);
