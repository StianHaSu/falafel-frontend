export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | undefined;
    description: string | undefined;
}

export interface ProductRequest {
    productName: string;
    productPrice: number;
    productDescription: string;
}