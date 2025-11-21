import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {Order} from "@/types/order";
import {CartItem} from "@/types/cart";

interface ProductStore {
    orders: Order[]
    setOrders: (orders: Order[]) => void
}

interface CartStore {
    cart: CartItem[]
    setCartItems: (items: CartItem[]) => void
    addToCart: (item: CartItem) => void
    decreaseQuantity: (itemId: string) => void
    removeFromCart: (itemId: string) => void
    showCart: boolean
    setShowCart: (show: boolean) => void
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

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set) => ({
                cart: [],
                setCartItems: (items) => set((state) => ({cart: items})),
                addToCart: (item) => set((state) => {
                    const existingItem = state.cart.find(cartItem => cartItem.productId === item.productId);
                    if (existingItem) {
                        return {
                            cart: state.cart.map(cartItem =>
                                cartItem.productId === item.productId
                                    ? {...cartItem, quantity: cartItem.quantity + item.quantity}
                                    : cartItem
                            ),
                        };
                    } else {
                        return {cart: [...state.cart, item]};
                    }
                }),
                decreaseQuantity: (itemId) => set((state) => {
                    const existingItem = state.cart.find(cartItem => cartItem.productId === itemId);
                    if (existingItem && existingItem.quantity > 1) {
                        return {
                            cart: state.cart.map(cartItem =>
                                cartItem.productId === itemId
                                    ? {...cartItem, quantity: cartItem.quantity - 1}
                                    : cartItem
                            ),
                        };
                    } else {
                        return {
                            cart: state.cart.filter(cartItem => cartItem.productId !== itemId),
                        };
                    }
                }),
                removeFromCart: (itemId) => set((state) => ({
                    cart: state.cart.filter(item => item.productId !== itemId),
                })),
                showCart: false,
                setShowCart: (show) => set((state) => ({showCart: show})),
            }),
            {
                name: 'cart-storage',
            },
        ),
    ),
)