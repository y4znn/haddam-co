"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Home Appliances", slug: "appliances" },
    { name: "Beauty & Grooming", slug: "beauty" },
    { name: "Kitchen", slug: "kitchen" },
    { name: "Audio & Sound", slug: "sound" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
} as any;

export function CategoryStrip() {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

    // Default to 'electronics' if no category is selected, or sync with URL
    const [activeCategory, setActiveCategory] = useState(currentCategory || "electronics");
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    // Sync state with URL params if they change externally (e.g. back button)
    useEffect(() => {
        if (currentCategory) {
            setActiveCategory(currentCategory);
        }
    }, [currentCategory]);

    // The logic: The pill follows the Hover, otherwise stays on Active
    const targetSlug = hoveredCategory || activeCategory;

    return (
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-16 overflow-hidden bg-glass-surface backdrop-blur-sm">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full flex justify-center gap-6 flex-wrap px-12 pb-4 items-center"
                onPointerLeave={() => setHoveredCategory(null)}
            >
                {categories.map((cat) => {
                    const isTarget = cat.slug === targetSlug;
                    const isActive = cat.slug === activeCategory;

                    return (
                        <motion.div
                            key={cat.slug}
                            variants={item}
                            className="snap-center shrink-0"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={`/products?category=${cat.slug}`}
                                onClick={() => setActiveCategory(cat.slug)}
                                className="relative block"
                                onPointerEnter={() => setHoveredCategory(cat.slug)}
                            >
                                <div className="relative px-8 py-3 rounded-full isolate">

                                    {/* The Single Roaming Pill */}
                                    {isTarget && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-brand-orange rounded-full z-0"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* Smart Text Contrast */}
                                    <span className={cn(
                                        "relative z-10 font-medium transition-all duration-200 uppercase tracking-widest text-xs md:text-sm",
                                        !isTarget && "text-muted-foreground" // Apply muted-foreground only if not the target
                                    )}
                                        style={{
                                            color: isTarget ? "#000000" : (isActive ? "#FF6B00" : undefined),
                                            textShadow: isTarget ? "none" : (isActive ? "0 0 8px rgba(255,107,0,0.5)" : undefined)
                                        }}>
                                        {cat.name}
                                    </span>

                                    {/* Inactive Border Hint (Background for items without pill) */}
                                    {!isTarget && (
                                        <div className="absolute inset-0 rounded-full border border-glass-border bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] z-[-1]" />
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
