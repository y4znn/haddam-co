"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";
import { containerVariants, itemVariants } from "@/lib/motion-variants";
import { AlertTriangle } from "lucide-react";

export const ProductGrid = ({ products }: { products: Product[] }) => {
    if (products.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center justify-center py-32 text-center"
            >
                <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center mb-6 bg-white/5 backdrop-blur-md">
                    <AlertTriangle className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-mono tracking-widest text-white/40 mb-2">NO SIGNAL DETECTED</h3>
                <p className="text-sm text-white/20 font-mono">ADJUST PARAMETERS TO RESUME FEED.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-12 w-full"
        >
            <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full"
                    >
                        <ProductCard product={product} index={index} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};
