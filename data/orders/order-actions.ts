import {Order} from "@/types/order";

export const getAllOrders = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/orders');

    if (!response || !response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data: Order[] = await response.json();
    return data;
}
