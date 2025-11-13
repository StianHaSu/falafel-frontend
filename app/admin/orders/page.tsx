'use client';

import {CustomNavbar} from "@/components/custom-navbar";
import {Button} from "@heroui/react";
import {Orders} from "@/components/orders";
import {Order} from "@/types/order";

import {useOrderStore} from "@/data/orders/order-store";
import {getAllOrders} from "@/data/orders/order-actions";

export default function Page() {
    const orders: Order[] = useOrderStore((state) => state.orders);
    const setOrders = useOrderStore((state) => state.setOrders);

    const loadProducts = async () => {
        setOrders(await getAllOrders());
    }

    return (
        <div>
            <CustomNavbar />
            <Button color={"primary"} onPress={loadProducts}>Load all orders</Button>
            <div className={"flex justify-center"}>
                <Orders orders={orders}></Orders>
            </div>
        </div>
    );
}