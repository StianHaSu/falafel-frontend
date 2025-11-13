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

export function CustomNavbar() {
    const pathname = usePathname();

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">Falafel admin dashboard</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathname === '/admin/products'}>
                    <Link color="foreground" href="/admin/products">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === '/admin/orders'}>
                    <Link aria-current="page" href="/admin/orders">
                        Orders
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}