"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 auto-rows-[minmax(100px,auto)]", className)}>
            {children}
        </div>
    );
}

export function BentoItem({ children, className, span = 4 }: { children: React.ReactNode; className?: string; span?: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                `md:col-span-${span} relative group`,
                className
            )}
        >
            {children}
        </motion.div>
    );
}
