"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("glass-card relative overflow-hidden rounded-2xl bg-white/5", className)}
            {...props}
        >
            <motion.div
                className="absolute inset-0 -translate-x-full"
                animate={{ translateX: ["-100%", "100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                    repeatDelay: 0.5,
                }}
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
                }}
            />
        </div>
    );
}
