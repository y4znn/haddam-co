"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    iconSize?: number;
    showText?: boolean;
}

export function AddToCartButton({
    product,
    className,
    iconSize = 20,
    showText = true
}: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (status !== 'idle') return;

        setStatus('loading');

        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 600));

        addItem(product);
        setStatus('success');
        toast.success(`${product.name} added to cart`);

        // Reset after success
        setTimeout(() => {
            setStatus('idle');
        }, 2000);
    };

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={cn(
                "relative overflow-hidden flex items-center justify-center gap-2 transition-all duration-300",
                status === 'success'
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]"
                    : "bg-transparent text-brand-orange shadow-[0_0_15px_-5px_var(--color-brand-orange)] hover:bg-brand-orange hover:text-black hover:shadow-[0_0_30px_var(--color-brand-orange)]",
                className
            )}
            layout
        >
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="flex items-center gap-2"
                    >
                        <ShoppingCart size={iconSize} />
                        {showText && <span>Add to Cart</span>}
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <Loader2 size={iconSize} className="animate-spin" />
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1.2, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="flex items-center gap-2 font-bold"
                    >
                        <Check size={iconSize} strokeWidth={3} />
                        {showText && <span>Added!</span>}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
