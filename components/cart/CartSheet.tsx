"use client";

import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function CartSheet({ children }: { children?: React.ReactNode }) {
    const cart = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    if (!isMounted) {
        return (
            <Button variant="ghost" size="icon" className="relative group">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    0
                </Badge>
            </Button>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children || (
                    <Button variant="ghost" size="icon" className="relative group">
                        <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors" />
                        {itemCount > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] animate-in zoom-in">
                                {itemCount}
                            </Badge>
                        )}
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="font-heading text-xl">My Cart ({itemCount})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-hidden py-4 flex flex-col">
                    {cart.items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-lg">Your cart is empty</p>
                                <p className="text-sm text-muted-foreground">Add some premium items to get started.</p>
                            </div>
                            <SheetClose asChild>
                                <Button variant="outline">Continue Shopping</Button>
                            </SheetClose>
                        </div>
                    ) : (
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-6">
                                {cart.items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-muted shrink-0">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold font-heading line-clamp-1 text-sm">{item.product.name}</h4>
                                                    <p className="text-xs text-muted-foreground">{item.product.category}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-2"
                                                    onClick={() => cart.removeItem(item.product.id)}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-1 border rounded-md p-0.5 h-7">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="text-xs w-6 text-center tabular-nums font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                <span className="font-mono font-bold text-sm text-primary">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {cart.items.length > 0 && (
                    <div className="space-y-4 pt-4 border-t bg-background mt-auto">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Total</span>
                            <span className="text-2xl font-bold font-mono text-primary">${total.toFixed(2)}</span>
                        </div>
                        <SheetClose asChild>
                            <Link href="/checkout" className="w-full block">
                                <Button className="w-full gap-2 font-bold" size="lg">
                                    Checkout Now <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
