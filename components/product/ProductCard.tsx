"use client";

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { AddToCartButton } from "./AddToCartButton";
import { useUserIntent } from "@/lib/context/UserIntentContext";
import React from "react";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {


    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Spotlight Gradient (converts -0.5...0.5 to 0...100%)
    const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const spotlight = useMotionTemplate`radial-gradient(400px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.15), transparent 80%)`;

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;

        const xPct = cursorX / width - 0.5;
        const yPct = cursorY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    const { registerInteraction } = useUserIntent();
    const startTimeRef = React.useRef<number>(0);

    function handleMouseEnter() {
        startTimeRef.current = Date.now();
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        if (startTimeRef.current > 0) {
            const duration = Date.now() - startTimeRef.current;
            registerInteraction(product.category, duration);
            startTimeRef.current = 0;
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                type: "spring", stiffness: 400, damping: 30
            }}
            whileTap={{ scale: 0.96 }}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-2xl text-foreground transition-all duration-500 h-full flex flex-col w-full mx-auto
            bg-glass-surface backdrop-blur-xl border border-glass-border
            shadow-glass-double
            hover:shadow-neon-glow hover:-translate-y-2 will-change-transform"
        >
            {/* Spotlight Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{ background: spotlight }}
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none z-0" />
            <Link href={`/product/${product.id}`} className="aspect-square relative overflow-hidden bg-muted/20 block cursor-pointer">
                {product.badge && (
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                        {product.badge}
                    </div>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 group-hover:-translate-y-2 relative z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>

            <div className="flex flex-1 flex-col p-5 relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <div className="mb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{product.category}</p>
                    <Link href={`/product/${product.id}`} className="block cursor-pointer">
                        <h3 className="line-clamp-1 font-heading font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors mt-1"
                            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary">${product.price.toLocaleString()}</span>
                    </div>

                    <AddToCartButton
                        product={product}
                        showText={false}
                        className="rounded-full p-2.5 h-10 w-10"
                    />
                </div>
            </div>
        </motion.div>
    );
}
