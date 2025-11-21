'use client';

import {CustomNavbar} from "@/components/custom-navbar";
import {Orders} from "@/components/orders";
import {Order} from "@/types/order";

import {useOrderStore} from "@/data/orders/order-store";

export default function Page() {
    const orders: Order[] = useOrderStore((state) => state.orders);
    const setOrders = useOrderStore((state) => state.setOrders);

    return (
        <div>
            <CustomNavbar />
            <div className={"flex justify-center mt-12"}>
                <Orders orders={orders}></Orders>
            </div>
        </div>
    );
}