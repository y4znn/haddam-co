"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types";
import { products } from "@/lib/data";
import { BentoGrid } from "@/components/home/BentoGrid";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  hover: { scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 30 } }
} as const;

const glowVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
} as const;

import { CategoryStrip } from "@/components/home/CategoryStrip";



export default function Home() {
  const { setTheme, theme } = useTheme();
  // Ensure we have a default for cart to avoid hydration mismatch if possible, 
  // but simpler to just use the hook. 
  // Note: LocalStorage persistence might cause hydration mismatch on first render.
  // Ideally use a 'mounted' check for separate rendering.
  const cartItems = useCart((state) => state.items);
  const featuredProduct = products.find(p => p.category === "appliances") || products[0];
  return (
    <div className="p-4 md:p-12 lg:p-16 2xl:px-24 flex flex-col justify-center w-full max-w-[2560px] mx-auto space-y-12 md:space-y-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[85dvh]"
      >
        {/* Top (Large): Hero/Featured Product - Spans full width now */}
        <motion.div variants={item} whileHover="hover" className="md:col-span-3 glass-panel relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between group cursor-pointer min-h-[600px] shadow-smooth">
          <motion.div variants={glowVariants} className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary mb-4 shadow-smooth">
              Featured Arrival
            </div>
            <h1 className="font-heading font-bold max-w-lg leading-tight text-white mb-4 tracking-tight drop-shadow-xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              {featuredProduct.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md font-medium leading-relaxed">
              {featuredProduct.description}
            </p>
            <div className="mt-8 relative z-20">
              <Link href="/products">
                <Button size="lg" magnetic sheen className="rounded-full px-8 font-bold tracking-wide shadow-smooth cursor-pointer">
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute right-[-5%] bottom-[-10%] w-[60%] h-[100%] transition-transform duration-700 group-hover:scale-105 pointer-events-none">
            <Image
              src={featuredProduct.image}
              alt={featuredProduct.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority={true}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        </motion.div>

      </motion.div>



      {/* Category Strip "Orange Pill" */}
      <Suspense fallback={<div className="h-20 w-full" />}>
        <CategoryStrip />
      </Suspense>

      {/* Brand Showcase Section */}
      <BentoGrid />

    </div>
  );
}
