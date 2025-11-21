import {Product, ProductRequest} from "@/types/product";
import products from "@/mock-data/product.json";

const mockProducts: Product[] = products as Product[];

export const getAllProducts = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/products');

    if (!response || !response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data: Product[] = await response.json();
    return data;
}

export const deleteProductById = async (productId: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/products/' + productId, {
        method: 'DELETE',
    });

    if (!response || !response.ok) {
        throw new Error('Failed to delete product');
    }
}

export const createNewProduct = async (product: ProductRequest) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response || !response.ok) {
        throw new Error('Failed to create new product');
    }
}
