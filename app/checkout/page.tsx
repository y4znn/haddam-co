"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Truck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const cart = useCart();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "+961",
        city: "",
        address: "",
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.city || !formData.address) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Lebanese Phone Validation (Simple check for +961 and length)
        // +961 X XXXXXX (8 digits total usually after +)
        // Regex: ^\+961\d{7,8}$
        const phoneRegex = /^\+961\d{7,8}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
            toast.error("Invalid phone number. Use format +961 XX XXXXXX");
            return;
        }

        // Success Logic
        const order = {
            user: formData,
            items: cart.items,
            total: total,
            timestamp: new Date().toISOString(),
            status: "pending_cod"
        };

        console.log("Order Placed:", order);
        toast.success("Order placed successfully!");

        // Simulate API call
        setTimeout(() => {
            cart.clearCart();
            setIsSuccess(true);
            window.scrollTo(0, 0);
        }, 1500);
    };

    if (!isMounted) return null;

    if (cart.items.length === 0 && !isSuccess) {
        return (
            <div className="container py-24 flex flex-col items-center justify-center text-center space-y-4 min-h-[60vh]">
                <h1 className="text-2xl font-bold font-heading">Your cart is empty</h1>
                <Link href="/">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="container py-24 max-w-2xl text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold font-heading mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Thank you, {formData.name}. We will contact you at {formData.phone} shortly to confirm delivery.
                </p>
                <div className="flex gap-4">
                    <Link href="/">
                        <Button size="lg">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-12 lg:py-16">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shopping
            </Link>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Checkout Form */}
                <div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-heading mb-2">Guest Checkout</h1>
                        <p className="text-muted-foreground">No account required. Cash on Delivery.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number (Lebanon)</Label>
                                <Input id="phone" name="phone" placeholder="+961 70 123456" value={formData.phone} onChange={handleInputChange} required />
                                <p className="text-xs text-muted-foreground">We will confirm via WhatsApp/Call.</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City / Area</Label>
                                <Input id="city" name="city" placeholder="Beirut, Achrafieh" value={formData.city} onChange={handleInputChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Detailed Address</Label>
                                <Input id="address" name="address" placeholder="Street, Building, Floor..." value={formData.address} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <Card className="bg-muted/30 border-dashed">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Truck className="w-4 h-4" /> Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 p-3 border rounded bg-background">
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="font-medium">Cash on Delivery (COD)</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Button type="submit" size="lg" className="w-full font-bold text-lg h-12">
                            Place Order - ${total.toFixed(2)}
                        </Button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="hidden lg:block space-y-6">
                    <Card className="sticky top-24 shadow-lg border-2">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px] px-6 py-2">
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 py-2">
                                            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                                                <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <Separator />
                        <CardFooter className="flex-col gap-4 p-6 bg-muted/20">
                            <div className="flex items-center justify-between w-full">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-mono">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-muted-foreground">Delivery</span>
                                <span className="font-mono text-green-600 font-medium">Free</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between w-full">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-2xl font-mono text-primary">${total.toFixed(2)}</span>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
