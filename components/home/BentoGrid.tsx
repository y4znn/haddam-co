"use client";

import { motion, useMotionValue, useSpring, useTransform, LayoutGroup } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUserIntent } from "@/lib/context/UserIntentContext";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

// Flagship Brand Data
const brands = [
    {
        id: "samsung",
        name: "SAMSUNG",
        flagship: "Neo QLED 8K & Bespoke",
        image: "https://images.unsplash.com/photo-1610945865626-d621e2b8606e?q=80&w=1974&auto=format&fit=crop", // Dark TV/Modern context
        href: "/products?brand=Samsung", // Context: Electronics
        colSpan: "md:col-span-2",
        rowSpan: "md:row-span-2",
        bgStyle: "bg-black/80", // Obsidian
    },
    {
        id: "lg",
        name: "LG",
        flagship: "InstaView & OLED Evo",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop", // Dark Steel fridge context
        href: "/products?brand=LG",
        colSpan: "md:col-span-2",
        bgStyle: "bg-slate-900", // Dark Steel
    },
    {
        id: "philips",
        name: "PHILIPS",
        flagship: "Premium Airfryers",
        image: "https://images.unsplash.com/photo-1585659858342-995b058c4084?q=80&w=2070&auto=format&fit=crop", // Coffee/Kitchen context
        href: "/products?brand=Philips",
        colSpan: "md:col-span-1",
        bgStyle: "bg-neutral-800", // Dark Grey
    },
    {
        id: "braun",
        name: "BRAUN",
        flagship: "Series 9 Pro",
        image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2080&auto=format&fit=crop", // Grooming/Tech
        href: "/products?brand=Braun", // Grooming isn't a category yet, mapping to nearest
        colSpan: "md:col-span-1",
        bgStyle: "bg-zinc-900", // Matte Black
    },
    {
        id: "tefal",
        name: "TEFAL",
        flagship: "Digital Airfryers",
        image: "https://images.unsplash.com/photo-1584949514785-5b8d2b704c34?q=80&w=2070&auto=format&fit=crop", // Cooking
        href: "/products?brand=Tefal",
        colSpan: "md:col-span-1",
        bgStyle: "bg-purple-950/30", // Reactor Purple hint
    },
    {
        id: "sharp",
        name: "SHARP",
        flagship: "4-Door Glass Fridge",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d58b7246?q=80&w=2070&auto=format&fit=crop", // Fridge
        href: "/products?brand=Sharp",
        colSpan: "md:col-span-1",
        bgStyle: "bg-slate-950",
    },
];



export function BentoGrid() {
    const { intent } = useUserIntent();

    const sortedBrands = useMemo(() => {
        const sorted = [...brands];
        if (intent === "luxury") {
            // Priority: Samsung, LG, Sharp
            sorted.sort((a, b) => {
                const priority = ["samsung", "lg", "sharp"];
                const aP = priority.includes(a.id) ? 1 : 0;
                const bP = priority.includes(b.id) ? 1 : 0;
                return bP - aP;
            });
        } else if (intent === "utilitarian") {
            // Priority: Braun, Tefal, Philips
            sorted.sort((a, b) => {
                const priority = ["braun", "tefal", "philips"];
                const aP = priority.includes(a.id) ? 1 : 0;
                const bP = priority.includes(b.id) ? 1 : 0;
                return bP - aP;
            });
        }
        return sorted;
    }, [intent]);

    return (
        <section className="container mx-auto px-4 py-8 mb-24">
            <h2 className="font-heading font-bold mb-2 text-foreground"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Flagship Partners
            </h2>
            <div className="flex items-center gap-2 mb-8 text-xs font-mono tracking-widest uppercase text-muted-foreground/50 h-4">
                <AnimatePresence>
                    {intent !== 'neutral' && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-brand-core animate-pulse" />
                            ADAPTING TO: {intent} PROTOCOL
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Enhanced Grid with Bento Geometry */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)] grid-flow-dense relative">
                <LayoutGroup>
                    <AnimatePresence mode="popLayout">
                        {sortedBrands.map((brand, index) => (
                            <BrandCard key={brand.id} brand={brand} index={index} />
                        ))}
                    </AnimatePresence>
                </LayoutGroup>
            </motion.div>
        </section>
    );
}

function BrandCard({ brand, index }: { brand: typeof brands[0], index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]); // Reduced tilt for stability
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        if (isExpanded) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;
        const xPct = cursorX / width - 0.5;
        const yPct = cursorY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            layoutId={`card-${brand.id}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                zIndex: isExpanded ? 50 : 1,
                position: isExpanded ? 'fixed' : 'relative',
                top: isExpanded ? 0 : 'auto',
                left: isExpanded ? 0 : 'auto',
                width: isExpanded ? '100vw' : '100%',
                height: isExpanded ? '100vh' : 'auto',
                borderRadius: isExpanded ? 0 : '1.5rem',
            }}
            transition={{
                layout: { duration: 0.6, type: "spring", damping: 25, stiffness: 40 },
                opacity: { duration: 0.5 }
            }}
            whileHover={!isExpanded ? {
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            } : {}}
            style={{
                rotateX: isExpanded ? 0 : rotateX,
                rotateY: isExpanded ? 0 : rotateY,
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative overflow-hidden cursor-pointer border border-white/10 shadow-smooth transition-all duration-500",
                !isExpanded && "min-h-[300px] rounded-2xl hover:border-cyan-500/30",
                !isExpanded && "shadow-[0_4px_6px_-2px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_-10px_rgba(0,240,255,0.3)]",
                !isExpanded && brand.colSpan,
                !isExpanded && (brand as any).rowSpan,
                brand.bgStyle,
                isExpanded && "z-50 inset-0 flex items-center justify-center bg-black"
            )}
        >
            <div className="relative w-full h-full">
                {/* Close Button if Expanded */}
                {isExpanded && (
                    <button
                        className="absolute top-8 right-8 z-50 p-4 bg-black/50 rounded-full text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                        }}
                    >
                        CLOSE PROTOCOL
                    </button>
                )}

                <Link href={isExpanded ? '#' : brand.href} className="block w-full h-full relative" onClick={e => isExpanded && e.preventDefault()}>
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            fill
                            className={cn(
                                "object-cover transition-transform duration-700 opacity-60",
                                !isExpanded && "group-hover:scale-110 group-hover:opacity-40",
                                isExpanded && "scale-100 opacity-30"
                            )}
                            priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Spotlight Shimmer */}
                        {!isExpanded && (
                            <div className="absolute inset-0 z-10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                        )}
                    </div>

                    {/* Content Overlay */}
                    <motion.div
                        layout="position"
                        className={cn("relative z-10 w-full h-full flex flex-col justify-end p-8", isExpanded && "p-24 justify-center items-center text-center")}
                        style={{ transform: "translateZ(20px)" }}
                    >
                        <div className="mb-4">
                            <motion.h3 layout="position" className={cn("font-bold tracking-widest uppercase text-white/90 drop-shadow-xl font-heading shadow-smooth", isExpanded ? "text-8xl" : "text-3xl md:text-4xl")}>
                                {brand.name}
                            </motion.h3>
                            <motion.div layout className={cn("h-1 bg-primary rounded-full mt-2 transition-all duration-300 shadow-smooth", isExpanded ? "w-32 mx-auto" : "w-12 group-hover:w-24")} />
                        </div>

                        <motion.div layout className="glass-panel px-4 py-3 rounded-xl inline-flex items-center justify-between border-white/10 bg-white/5 backdrop-blur-md shadow-smooth">
                            <span className="text-sm md:text-base font-medium text-slate-200 tracking-wide">
                                {brand.flagship}
                            </span>
                            {!isExpanded && <ArrowRight className="w-4 h-4 text-primary ml-4 group-hover:translate-x-1 transition-transform" />}
                        </motion.div>

                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8"
                            >
                                <Link href={brand.href}>
                                    <button className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                                        INITIATE NEURAL LINK
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Shine Effect */}
                    {!isExpanded && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 skew-x-12 translate-x-[-200%] group-hover:animate-shine pointer-events-none" />
                    )}
                </Link>
            </div>
        </motion.div>
    );
}
