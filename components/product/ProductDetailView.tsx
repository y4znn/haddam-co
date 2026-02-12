"use client";

import { Product } from "@/types";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { HolodeckViewer } from "@/components/product/HolodeckViewer";

export function ProductDetailView({ product }: { product: Product }) {
    return (
        <div className="container py-12 lg:py-16">
            {/* Breadcrumb Mock */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <span>Home</span>
                <span>/</span>
                <span className="capitalize">{product.category}</span>
                <span>/</span>
                <span className="text-foreground font-medium">{product.name}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Image Gallery / Holodeck */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-0 rounded-3xl relative aspect-square flex items-center justify-center overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />

                    <HolodeckViewer
                        image={product.image}
                        name={product.name}
                        badge={product.badge}
                    />
                </motion.div>

                {/* Product Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white/90">
                            {product.name}
                        </h1>
                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-mono font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.price > 500 && (
                                <span className="text-sm text-green-500 font-medium px-2 py-1 bg-green-500/10 rounded-full">
                                    Free Shipping
                                </span>
                            )}
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="prose prose-invert text-muted-foreground">
                        <p className="text-lg leading-relaxed">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                            <Truck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">Fast Delivery</span>
                            <span className="text-xs text-muted-foreground">Within 2-3 Days</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">Warranty</span>
                            <span className="text-xs text-muted-foreground">1 Year Official</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                        <AddToCartButton
                            product={product}
                            className="w-full h-14 rounded-xl font-bold text-lg shadow-[0_0_20px_-5px_rgba(252,84,47,0.5)] hover:shadow-[0_0_30px_-5px_rgba(252,84,47,0.7)]"
                        />
                        <p className="text-center text-xs text-muted-foreground">
                            Secure Checkout • Cash on Delivery Available
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
