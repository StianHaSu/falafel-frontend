export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    description: string | null;
    categories: ProductCategory[] | null;
}

export enum ProductCategory {
    FALAFELS = "Falafels",
    SIDES = "Sides",
    DRINKS = "Drinks",
}

export interface ProductRequest {
    productName: string;
    productPrice: number;
    productDescription: string;
}

export interface ProductPatchRequest {
    productName: string | null;
    productPrice: number | null;
    productDescription: string | null;
    categoryUpdates: CategoryPatchRequest | null;
}

export interface CategoryPatchRequest {
    add: string | null,
    remove: ProductCategory | null,
}
