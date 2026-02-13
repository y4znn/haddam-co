"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoloCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative overflow-hidden rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-glass-double transition-colors duration-500",
                "hover:border-cyan-500/30 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.3)]",
                className
            )}
        >
            {/* Holographic noise/texture can go here */}
            {children}
        </motion.div>
    );
}
