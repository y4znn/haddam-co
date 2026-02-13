"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Truck, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AddressForm } from "@/components/checkout/AddressForm";
import { ReticleCursor } from "@/components/ui/ReticleCursor";
import { motion, AnimatePresence } from "framer-motion";

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

        if (!formData.name || !formData.city || !formData.address) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const rawPhone = formData.phone.replace(/\s/g, "").replace(/^00/, "+");
        const lbRegex = /^(\+961)(3|70|71|76|78|79|81)\d{6}$/;

        if (!lbRegex.test(rawPhone)) {
            if (/^(\+961)(03)\d{6}$/.test(rawPhone)) {
                toast.error("For alpha/touch lines, use +961 3 XXXXXX (remove the 0)");
                return;
            }
            toast.error("Invalid Lebanese Mobile Number.");
            return;
        }

        const newOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
        setOrderId(newOrderId);
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setShowWhatsAppModal(true);
            window.scrollTo(0, 0);
        }, 1500);
    };

    if (showWhatsAppModal) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 cursor-default">
                <div className="bg-[#18181b] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent" />
                    <div className="w-20 h-20 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10" />
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
                            cart.clearCart();
                            setTimeout(() => router.push('/'), 2000);
                        }}
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer"
                    >
                        Verify on WhatsApp
                    </a>
                </div>
            </div>
        )
    }

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

    return (
        <div className="min-h-screen bg-[#050B14] text-foreground relative overflow-hidden">
            <ReticleCursor />

            {/* Background Atmosphere */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.05),transparent_40%)] pointer-events-none" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(176,38,255,0.05),transparent_40%)] pointer-events-none" />

            {/* Header */}
            <header className="absolute top-0 left-0 w-full p-6 lg:px-12 flex justify-between items-center z-10 border-b border-white/5 bg-[#050B14]/80 backdrop-blur-md">
                <Link href="/" className="flex items-center space-x-2 font-heading font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity cursor-pointer">
                    <span>Haddam</span>
                    <span className="text-primary">.co</span>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold tracking-wider">
                    <Lock className="w-3 h-3" />
                    SECURE ENCLAVE
                </div>
            </header>

            <main className="pt-32 pb-12 px-4 lg:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Column 1: Input Deck (Input Fields) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-4xl font-bold font-heading tracking-tight mb-2 text-white">Checkout</h1>
                                <p className="text-muted-foreground">Initialize tactical deployment.</p>
                            </div>
                            <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer">
                                <ArrowLeft className="w-4 h-4" /> Return to Base
                            </Link>
                        </div>

                        {/* Contact & Shipping Module */}
                        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0F172A]/60 backdrop-blur-md shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-cyan-500 rounded-full" />
                                Coordinates & Identity
                            </h3>
                            <AddressForm
                                formData={formData}
                                onChange={handleInputChange}
                                onValidationChange={setIsAddressValid}
                            />
                        </div>

                        {/* Payment Module */}
                        <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-[#0F172A]/60 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                                <span className="w-2 h-8 bg-brand-orange rounded-full" />
                                Payment Protocol
                            </h3>

                            <div className="flex items-center gap-4 p-5 border border-brand-orange/30 bg-brand-orange/5 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.05),transparent)] animate-shimmer" />
                                <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 border border-brand-orange/50 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                                    <Truck className="w-6 h-6 text-brand-orange" />
                                </div>
                                <div>
                                    <div className="font-bold text-brand-orange tracking-wide">CASH ON DELIVERY (COD)</div>
                                    <div className="text-xs text-muted-foreground mt-1">Payment verified upon physical asset handover.</div>
                                </div>
                                <div className="ml-auto font-mono text-brand-orange font-bold text-sm bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                                    FEES WAIVED
                                </div>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <Button
                            onClick={handleSubmit}
                            size="xl"
                            variant="solid"
                            magnetic
                            sheen
                            isLoading={isSubmitting}
                            className="w-full font-bold text-xl h-24 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] transition-all tracking-widest bg-cyan-500 text-black border border-cyan-400/50"
                            disabled={!isAddressValid || isSubmitting}
                        >
                            {isAddressValid ? (
                                <span className="flex items-center gap-3">
                                    CONFIRM DEPLOYMENT <span className="opacity-50">|</span> ${total.toFixed(2)}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 opacity-70">
                                    <Lock className="w-5 h-5" /> AWAITING COORDINATES
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* Column 2: The Manifest (Order Summary) */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-6">
                            <div className="glass-panel rounded-3xl border border-white/5 bg-[#0F172A]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-160px)]">
                                <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
                                    <h2 className="text-xl font-bold text-white tracking-wide flex items-center justify-between">
                                        <span>Manifest Summary</span>
                                        <span className="text-sm font-mono text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/30">
                                            {cart.items.length} ITEMS
                                        </span>
                                    </h2>
                                </div>

                                <ScrollArea className="flex-1 p-6">
                                    <div className="space-y-6">
                                        {cart.items.map((item, idx) => (
                                            <div key={item.product.id} className="group flex gap-4 items-center">
                                                {/* 3D Digital Twin Thumbnail */}
                                                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10 group-hover:border-cyan-500/50 transition-colors perspective-1000">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none" />
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-y-180"
                                                        style={{ transformStyle: "preserve-3d" }}
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors cursor-pointer">
                                                        {item.product.name}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-xs font-mono text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                                                            QTY: {item.quantity}
                                                        </span>
                                                        <span className="text-xs font-mono text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                                                            {item.product.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-mono font-bold text-lg text-white">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                <div className="p-6 bg-[#050B14]/50 border-t border-white/5 space-y-3 backdrop-blur-md">
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="font-mono text-white">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Logistics</span>
                                        <span className="font-mono text-emerald-400">FEES WAIVED</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-xl text-white">Total</span>
                                        <div className="text-right">
                                            <span className="block font-bold text-3xl font-mono text-cyan-400 glow-text">${total.toFixed(2)}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Inc. Taxes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="flex justify-center items-center gap-3 opacity-30 grayscale mix-blend-screen pointer-events-none select-none py-4">
                                <ShieldCheck className="w-5 h-5 text-white" />
                                <span className="text-xs font-mono tracking-[0.2em] text-white">ENCRYPTED TRANSACTION CHANNEL</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
