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
import {SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/nextjs";

export function CustomNavbar() {
    const pathname = usePathname();

    return (
        <div className={"py-4"}>
            <Navbar>
                <NavbarBrand className={"space-x-4"}>
                    <Image
                        alt="Image of a falafel wrap"
                        src="/falafel-wrap.png"
                        width={75}
                    />
                    <p className="font-bold text-2xl text-inherit">Falafel admin dashboard</p>
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
                </NavbarContent>
                <NavbarContent justify="end">
                    <SignedOut>
                        <NavbarItem className="hidden lg:flex">
                            <SignInButton />
                        </NavbarItem>
                    </SignedOut>
                    <SignedIn>
                        <NavbarItem>
                            <SignOutButton />
                        </NavbarItem>
                    </SignedIn>
                </NavbarContent>
            </Navbar>
        </div>
    );
}