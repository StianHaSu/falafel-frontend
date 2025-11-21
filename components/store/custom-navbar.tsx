'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@heroui/navbar";

import Link from "next/link";
import {Button} from "@heroui/react";
import { usePathname } from 'next/navigation';
import {Image} from "@heroui/image";
import {useCartStore} from "@/data/orders/order-store";

export function CustomNavbar() {
    const pathname = usePathname();
    const cart = useCartStore((state) => state.cart);
    const setShowCart = useCartStore((state) => state.setShowCart);

    return (
        <div className={"py-4"}>
            <Navbar>
                <NavbarBrand className={"space-x-4"}>
                    <Image
                        alt="Image of a falafel wrap"
                        src="/falafel-wrap.png"
                        width={75}
                    />
                    <p className="font-bold text-2xl text-inherit">Falafel store</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button onPress={() => setShowCart(true)} href="#" variant="light">
                            <span className={"text-5xl"}>
                                 <i className={"fa fa-shopping-cart"} aria-hidden="true"></i>
                            </span>
                            <span className={"text-lg"}>
                                <p>{cart.reduce((total, item) => total + item.price * item.quantity, 0)}kr</p>
                            </span>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    );
}