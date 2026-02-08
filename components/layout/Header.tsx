"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartSheet } from "@/components/cart/CartSheet";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 font-heading font-bold text-2xl tracking-tighter hover:opacity-90 transition-opacity">
                    <span>Haddam</span>
                    <span className="text-primary">.co</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/#electronics" className="hover:text-primary transition-colors">Electronics</Link>
                    <Link href="/#appliances" className="hover:text-primary transition-colors">Appliances</Link>
                    <Link href="/#tools" className="hover:text-primary transition-colors">Tools</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <CartSheet />
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                        عربي
                    </Button>
                </div>
            </div>
        </header>
    );
}
