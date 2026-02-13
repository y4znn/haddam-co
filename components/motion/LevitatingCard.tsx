"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LevitatingCardProps {
    children: React.ReactNode;
    className?: string;
}

export function LevitatingCard({ children, className }: LevitatingCardProps) {
    return (
        <motion.div
            animate={{
                y: [0, -15, 0], // Smooth floating motion
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
            className={cn("will-change-transform", className)}
        >
            {children}
        </motion.div>
    );
}
