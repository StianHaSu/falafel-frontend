import {Product, ProductPatchRequest, ProductRequest} from "@/types/product";
import products from "@/mock-data/product.json";
import {PaymentStatus} from "@/types/enums";
import { useAuth } from "@clerk/nextjs";

const mockProducts: Product[] = products as Product[];

export const getAllProducts = async () => {

    const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/products`
    );

    if (!response || !response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data: Product[] = await response.json();
    return data;
}

export const deleteProductById = async (productId: string, token: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/products/' + productId, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response || !response.ok) {
        throw new Error('Failed to delete product');
    }
}

export const createNewProduct = async (product: ProductRequest, token: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });

    if (!response || !response.ok) {
        throw new Error('Failed to create new product');
    }
}

export const patchProductById = async (productId: string, productPatch: ProductPatchRequest, token: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/products/'+productId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productPatch),
    });

    if (!response || !response.ok) {
        throw new Error('Failed to patch product');
    }
}
