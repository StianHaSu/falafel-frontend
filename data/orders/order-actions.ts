import {Order, PatchOrderRequest} from "@/types/order";
import {ProductRequest} from "@/types/product";

export const getAllOrders = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/orders');

    if (!response || !response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data: Order[] = await response.json();
    return data;
}

export const updateOrder = async (orderId: string, orderPatch: PatchOrderRequest) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/orders/'+orderId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPatch),
    });

    if (!response || !response.ok) {
        throw new Error('Failed to create new product');
    }
}