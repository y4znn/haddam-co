"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shipping = 0; // Calculated at checkout
    const total = subtotal + shipping;

    if (!mounted) return <div className="min-h-screen bg-black" />; // Prevent hydration mismatch

    if (items.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 max-w-md"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]">
                        <Trash2 className="w-10 h-10 text-white/20" />
                    </div>
                    <h1 className="text-4xl font-bold font-heading tracking-tight text-white">
                        SYSTEM EMPTY
                    </h1>
                    <p className="text-white/50 font-mono text-sm leading-relaxed">
                        // INVENTORY MANIFEST IS CLEARED.<br />
                        // RETURN TO SUPPLY TO RE-ARM.
                    </p>
                    <Link href="/products">
                        <Button variant="solid" size="lg" magnetic sheen>
                            RETURN TO SUPPLY
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
            {/* Header */}
            <header className="mb-12 md:mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20"
                >
                    TACTICAL
                    <br />
                    MANIFEST
                </motion.h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="h-1 bg-brand-orange mt-6 rounded-full shadow-neon-glow"
                />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 relative">
                {/* Left Column: Inventory List */}
                <div className="lg:col-span-2">
                    <ul className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.li
                                    key={item.product.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                                    className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-6 items-center hover:bg-white/10 transition-colors"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-24 h-24 shrink-0 bg-black/50 rounded-xl overflow-hidden border border-white/5">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-white truncate pr-4">
                                                {item.product.name}
                                            </h3>
                                            <p className="font-mono text-brand-orange font-bold text-lg">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="font-mono text-xs text-white/40 mb-4 uppercase tracking-wider">
                                            // VARIANT: {item.product.category}
                                        </p>

                                        {/* Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white/70 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center font-mono text-sm font-bold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </div>

                {/* Right Column: Cost Breakdown (Sticky) */}
                <div className="lg:col-span-1 relative">
                    <div className="sticky top-24">
                        <div className="bg-glass-surface backdrop-blur-2xl border border-glass-border rounded-3xl p-8 shadow-glass-double relative overflow-hidden">
                            {/* Noise Texture */}
                            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                            <h2 className="text-xl font-bold font-heading mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                                COST BREAKDOWN
                            </h2>

                            <div className="space-y-4 font-mono text-sm border-b border-white/10 pb-8 mb-8">
                                <div className="flex justify-between text-white/60">
                                    <span>SUBTOTAL</span>
                                    <span className="text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>SHIPPING</span>
                                    <span className="text-white">CALCULATED NEXT</span>
                                </div>
                                <div className="flex justify-between text-white/60 italic">
                                    <span>TAXES</span>
                                    <span className="text-white">--</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline mb-8">
                                <span className="text-sm font-bold text-white/40 tracking-wider">TOTAL_EST</span>
                                <span className="text-4xl font-bold font-heading text-white tracking-tight">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <Link href="/checkout" className="block">
                                <Button
                                    variant="solid"
                                    size="xl"
                                    className="w-full relative overflow-hidden group"
                                    magnetic
                                    sheen
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        INITIATE SECURE CHECKOUT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>

                            <p className="text-center mt-6 text-[10px] text-white/30 font-mono">
                                // ENCRYPTED TRANSACTION PROTOCOL V4.2
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
