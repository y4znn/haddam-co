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
import { ReactorCore } from "@/components/industrial/ReactorCore";
import { LevitatingCard } from "@/components/motion/LevitatingCard";

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
        <LevitatingCard className="md:col-span-3 h-full">
          <motion.div variants={item} whileHover="hover" className="h-full glass-panel relative overflow-hidden rounded-2xl p-0 flex flex-col md:flex-row group shadow-smooth border border-cyan-400/30 hover:border-cyan-400/60 transition-colors bg-[#050B14]">
            {/* Content Side */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
              <motion.div variants={glowVariants} className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent z-0 pointer-events-none" />

              <div className="inline-flex items-center self-start rounded-full border border-cyan-400/50 bg-cyan-950/30 px-3 py-1 text-xs font-bold tracking-widest uppercase text-cyan-400 mb-6 shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                System Online
              </div>

              <h1 className="font-heading font-bold leading-none text-white mb-6 tracking-tight drop-shadow-xl"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                INDUSTRIAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">LUXURY</span>
              </h1>

              <p className="text-lg text-muted-foreground/80 font-medium leading-relaxed max-w-md mb-8">
                Experience the next generation of appliance architecture. Engineered for zero-gravity environments.
              </p>

              <Link href="/products">
                <Button size="lg" className="rounded-full px-8 font-bold tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-105 transition-all duration-300">
                  Initialize Sequence <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Reactor Side */}
            <div className="relative w-full md:w-1/2 h-[500px] md:h-auto border-l border-white/5">
              <ReactorCore />
            </div>
          </motion.div>
        </LevitatingCard>

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
