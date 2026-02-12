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
import { AddressForm } from "@/components/checkout/AddressForm";
import { Lock } from "lucide-react";

export default function CheckoutPage() {
    const cart = useCart();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);

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

    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [orderId, setOrderId] = useState("");

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

        // Lebanese Phone Validation (Strict +961)
        // Regex: ^(\+961|00961)?(3|70|71|76|78|79|81)\d{6}$
        // We will strip spaces first
        const rawPhone = formData.phone.replace(/\s/g, "").replace(/^00/, "+"); // Normalize 00961 to +961
        const phoneRegex = /^(\+961)(3|70|71|76|78|79|81|03)\d{6}$/; // Added 03 just in case they typed +961 03... (common mistake, though usually it's +961 3)
        // Let's stick to the user's requested regex but ensure +961 is there.
        // Simplified for user ease but strict on structure:
        // Must start with +961
        // Followed by 3, 70, 71, 76, 78, 79, 81 (Mobile Codes)
        // Followed by 6 digits

        // Let's use a robust testing regex:
        const lbRegex = /^(\+961)(3|70|71|76|78|79|81)\d{6}$/;

        if (!lbRegex.test(rawPhone)) {
            // Try to be helpful if they put 03 instead of 3
            if (/^(\+961)(03)\d{6}$/.test(rawPhone)) {
                toast.error("For alpha/touch lines, use +961 3 XXXXXX (remove the 0)");
                return;
            }
            toast.error("Invalid Lebanese Mobile Number. Use format +961 XX XXXXXX (e.g., +961 70 123456)");
            return;
        }

        // Success Logic - Create Pending Order
        const newOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
        setOrderId(newOrderId);

        setIsSubmitting(true);

        // Simulate "Lock" delay for mechanical feel
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setShowWhatsAppModal(true);
            window.scrollTo(0, 0);
        }, 1500);
    };

    // ... (rest of the file)

    <Button
        type="submit"
        size="xl"
        variant="solid"
        magnetic
        sheen
        isLoading={isSubmitting}
        className="w-full font-bold text-lg h-16 shadow-lg hover:shadow-xl transition-all"
    >
        <span className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            CONFIRM ORDER (COD) - ${total.toFixed(2)}
        </span>
    </Button>
    if (showWhatsAppModal) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                <div className="bg-[#18181b] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent" />

                    <div className="w-20 h-20 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    </div>

                    <h2 className="text-2xl font-bold font-heading text-white mb-2">Final Step: Verify Order</h2>
                    <p className="text-muted-foreground mb-8">
                        To dispatch your driver instantly, verify your location/identity via WhatsApp.
                    </p>

                    <a
                        href={`https://wa.me/96170123456?text=I confirm my order %23${orderId} for ${formData.name}. Location: ${formData.city}, ${formData.address}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            // After clicking, assume verified/sent
                            cart.clearCart();
                            // Optional: navigate to success or stay here
                            setTimeout(() => router.push('/'), 2000);
                        }}
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        Verify on WhatsApp
                    </a>

                    <button
                        onClick={() => setShowWhatsAppModal(false)}
                        className="mt-4 text-xs text-muted-foreground hover:text-white underline"
                    >
                        Verify Later (Delay Dispatch)
                    </button>
                </div>
            </div>
        )
    }

    if (!isMounted) return null;

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
        <div className="w-full relative min-h-screen bg-background">
            {/* Secure Enclave Header */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/" className="flex items-center space-x-2 font-heading font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity">
                    <span>Haddam</span>
                    <span className="text-primary">.co</span>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold tracking-wider">
                    <Lock className="w-3 h-3" />
                    SECURE ENCLAVE
                </div>
            </div>

            <div className="container pt-32 pb-24 grid gap-12 lg:grid-cols-2 relative z-0">
                {/* Checkout Form */}
                <div>
                    <div className="mb-2">
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Reality
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold font-heading mb-2 tracking-tight">Checkout</h1>
                        <p className="text-muted-foreground text-lg">Initialize deployment of tactical assets.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <AddressForm
                            formData={formData}
                            onChange={handleInputChange}
                            onValidationChange={setIsAddressValid}
                        />

                        <Card className="bg-white/5 border-white/10 overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
                                <Truck className="w-5 h-5 text-brand-orange" />
                                <span className="font-bold text-sm tracking-wide">LOGISTICS METHOD</span>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 p-4 border border-brand-orange/30 bg-brand-orange/10 rounded-xl relative overflow-hidden">
                                    {/* Scanline */}
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.1),transparent)] animate-shimmer" />

                                    <div className="w-4 h-4 rounded-full bg-brand-orange shadow-[0_0_10px_orange]" />
                                    <div>
                                        <div className="font-bold text-foreground">Cash on Delivery (COD)</div>
                                        <div className="text-xs text-muted-foreground">Payment upon secure asset handover.</div>
                                    </div>
                                    <div className="ml-auto font-mono text-brand-orange font-bold">FEES WAIVED</div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Button
                                type="submit"
                                size="xl"
                                variant="solid"
                                magnetic
                                sheen
                                isLoading={isSubmitting}
                                className="w-full font-bold text-xl h-20 shadow-2xl hover:shadow-brand-orange/20 transition-all will-change-transform tracking-widest"
                                disabled={!isAddressValid || isSubmitting}
                            >
                                {isAddressValid ? (
                                    <span className="flex items-center gap-3">
                                        CONFIRM DEPLOYMENT - ${total.toFixed(2)}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-white/50">
                                        <Lock className="w-4 h-4" /> AWAITING TARGET COORDINATES
                                    </span>
                                )}
                            </Button>

                            {/* Trust Injection */}
                            <div className="flex justify-center items-center gap-6 opacity-40 grayscale mix-blend-screen pointer-events-none select-none">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-5 rounded bg-white/20" /> {/* Visa Proxy */}
                                    <div className="w-8 h-5 rounded bg-white/20" /> {/* Mastercard Proxy */}
                                </div>
                                <div className="h-4 w-px bg-white/20" />
                                <div className="flex items-center gap-1 text-[10px] font-mono tracking-widest">
                                    <Lock className="w-3 h-3" />
                                    256-BIT ENCRYPTED
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="hidden lg:block space-y-6">
                    <Card className="sticky top-24 glass-card border-none shadow-xl">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px] px-6 py-2">
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 py-2">
                                            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-primary shrink-0">
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
