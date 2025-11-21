'use client';

import {ProductCard} from "@/components/store/product-card";
import {Product} from "@/types/product";
import {useProductStore} from "@/data/products/products-store";
import {useCartStore} from "@/data/orders/order-store";
import {CustomNavbar} from "@/components/store/custom-navbar";
import {Cart} from "@/components/store/cart";
import Modal from "@/components/store/Modal";
import {useEffect} from "react";
import {getAllProducts} from "@/data/products/product-actions";

export default function Page(){
    const products: Product[] = useProductStore((state) => state.products);
    const setProducts = useProductStore((state) => state.setProducts);
    const addProduct = useProductStore((state) => state.setProducts);
    const cart = useCartStore((state) => state.cart);
    const showCart = useCartStore((state) => state.showCart);
    const setShowCart = useCartStore((state) => state.setShowCart);

    useEffect(() => {
        console.log("Loading products...");
        getAllProducts()
            .then((fetchedProducts) => {
                setProducts(fetchedProducts);
            })
    }, [setProducts]);

    return (
        <div>
            <CustomNavbar />
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"}>
                {products.map((product) =>
                    <ProductCard key={product.price} product={product}/>
                )}
            </div>
            <Modal isOpen={showCart} onClose={() => setShowCart(false)}>
                <Cart></Cart>
            </Modal>
        </div>
    )
}