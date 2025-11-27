'use client';

import {Product} from "@/types/product";
import {useProductStore} from "@/data/products/products-store";
import {Products} from "@/components/admin/products";
import {CustomNavbar} from "@/components/admin/custom-navbar";

export default function Page(){
    const products: Product[] = useProductStore((state) => state.products);

    return (
        <div>
            <CustomNavbar />
            <div className={"flex justify-center mt-12"}>
                <Products products={products}></Products>
            </div>
        </div>
    )
}