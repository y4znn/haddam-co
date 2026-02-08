"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
        >
            <div className="aspect-square relative overflow-hidden bg-muted">
                {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10 font-bold tracking-wide shadow-sm" variant="secondary">
                        {product.badge}
                    </Badge>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Button
                        onClick={() => toast.success(`Added ${product.name} to cart`)}
                        size="lg"
                        className="rounded-full gap-2 font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <Plus className="w-5 h-5" /> Add to Cart
                    </Button>
                </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.category}</p>
                        <h3 className="font-heading font-bold text-lg leading-tight mt-1">{product.name}</h3>
                    </div>
                    <span className="font-bold text-xl text-primary font-mono whitespace-nowrap">${product.price}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </div>
        </motion.div>
    );
}
