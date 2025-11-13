'use client';

import {Product} from "@/types/product";
import {useProductStore} from "@/data/products/products-store";
import {getAllProducts} from "@/data/products/product-actions";
import {Products} from "@/components/products";
import {CreateProduct} from "@/components/create-product";
import {Button} from "@heroui/react";
import {CustomNavbar} from "@/components/custom-navbar";

export default function Page(){
    const products: Product[] = useProductStore((state) => state.products);
    const setProducts = useProductStore((state) => state.setProducts);

    const loadProducts = async () => {
        setProducts(await getAllProducts());
    }

    return (
        <div>
            <CustomNavbar />
            <Button color={"primary"} onPress={loadProducts}>Load all products</Button>
            <div className={"flex justify-center"}>
                <Products products={products}></Products>
            </div>
            <div>
                <CreateProduct></CreateProduct>
            </div>
        </div>
    )
}