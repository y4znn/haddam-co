"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Package, ShoppingBag, Phone, ChevronRight, Truck, Activity } from "lucide-react";
import { Product } from "@/types";
import { products } from "@/lib/data";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const router = useRouter();

    // Ghost Text Logic
    const ghostText = React.useMemo(() => {
        if (!query) return "";
        const match = products.find(p => p.name.toLowerCase().startsWith(query.toLowerCase()));
        return match ? match.name.slice(query.length) : "";
    }, [query]);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        const openPalette = () => setOpen(true);
        window.addEventListener("open-search-palette", openPalette);
        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-search-palette", openPalette);
        };
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <div onClick={(e) => { e.stopPropagation(); setOpen(true); }} className="cursor-pointer relative z-50 pointer-events-auto">{children}</div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 pointer-events-auto"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setOpen(false);
                        }}
                    >
                        <motion.div
                            layoutId="command-palette"
                            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            exit={{ scale: 0.95, opacity: 0, filter: "blur(5px)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="w-full max-w-2xl bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Command className="w-full bg-transparent" shouldFilter={false}>
                                <div className="flex items-center border-b border-white/10 px-4 relative">
                                    <Search className="w-5 h-5 text-brand-orange mr-2" />
                                    <div className="relative w-full">
                                        {/* Ghost Text Overlay */}
                                        <div className="absolute inset-0 flex items-center pointer-events-none h-14">
                                            <span className="text-transparent">{query}</span>
                                            <span className="text-muted-foreground/30">{ghostText}</span>
                                        </div>
                                        <Command.Input
                                            value={query}
                                            onValueChange={setQuery}
                                            placeholder="Search quantum inventory..."
                                            className="w-full h-14 bg-transparent outline-none text-white font-mono placeholder:text-muted-foreground/50 border-none focus:ring-0 relative z-10"
                                        />
                                    </div>
                                    {query && (
                                        <div className="absolute right-4 text-[10px] text-muted-foreground font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                                            ESA-99
                                        </div>
                                    )}
                                </div>

                                <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                                    <Command.Empty className="py-12 text-center flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <Activity className="w-8 h-8 opacity-20" />
                                        <span className="font-mono text-xs tracking-widest">SIGNAL LOST</span>
                                    </Command.Empty>

                                    <Command.Group heading="Neural Predictions" className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 py-2">
                                        {products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                                            <Command.Item
                                                key={product.id}
                                                onSelect={() => runCommand(() => router.push(`/product/${product.id}`))}
                                                className="group flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-white/5 transition-all relative overflow-hidden mb-1"
                                            >
                                                {/* Neon Cursor (Left Bar) */}
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange opacity-0 group-aria-selected:opacity-100 transition-opacity shadow-[0_0_15px_var(--color-brand-orange)]" />

                                                {/* Mini-Bento Image */}
                                                <div className="relative w-12 h-12 rounded-lg bg-white/5 overflow-hidden shrink-0 border border-white/10 group-aria-selected:border-brand-orange/50 transition-colors">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover opacity-80 group-aria-selected:opacity-100 transition-opacity"
                                                        sizes="48px"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-sans font-bold text-lg tracking-tight text-white group-aria-selected:text-brand-orange transition-colors truncate flex-1">
                                                            {product.name}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 uppercase tracking-wide">
                                                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                                            In Stock
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-xs text-brand-orange tracking-widest uppercase group-aria-selected:text-white transition-colors">
                                                            ${product.price} <span className="text-white/30 text-[10px] ml-1">UNIT PRICE</span>
                                                        </span>
                                                        <span className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest group-aria-selected:text-white/50">{product.brand}</span>
                                                    </div>
                                                </div>

                                                <ChevronRight className="w-5 h-5 text-brand-orange opacity-0 -translate-x-4 group-aria-selected:opacity-100 group-aria-selected:translate-x-0 transition-all duration-300" />
                                            </Command.Item>
                                        ))}
                                    </Command.Group>

                                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4 my-2" />

                                    <Command.Group heading="System Actions" className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] px-3 py-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => router.push('/cart'))}
                                            className="group flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer aria-selected:bg-white/10 transition-colors mb-1 relative overflow-hidden"
                                        >
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-aria-selected:opacity-100 transition-opacity shadow-[0_0_15px_#3B82F6]" />
                                            <div className="p-2.5 rounded-lg bg-white/5 text-white/50 group-aria-selected:text-blue-400 group-aria-selected:bg-blue-500/10 transition-colors">
                                                <ShoppingBag className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-sans font-bold text-base text-white group-aria-selected:text-blue-400 transition-colors">View Cart</span>
                                                <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">Manage Inventory</span>
                                            </div>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => { })}
                                            className="group flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer aria-selected:bg-white/10 transition-colors relative overflow-hidden"
                                        >
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 opacity-0 group-aria-selected:opacity-100 transition-opacity shadow-[0_0_15px_#A855F7]" />
                                            <div className="p-2.5 rounded-lg bg-white/5 text-white/50 group-aria-selected:text-purple-400 group-aria-selected:bg-purple-500/10 transition-colors">
                                                <Truck className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-sans font-bold text-base text-white group-aria-selected:text-purple-400 transition-colors">Track Order</span>
                                                <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">Locate Shipment</span>
                                            </div>
                                        </Command.Item>
                                    </Command.Group>
                                </Command.List>

                                <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] bg-black/40">
                                    <span className="flex items-center gap-2">
                                        <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/5 text-white">KB</span>
                                        <span>NAVIGATE</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse shadow-[0_0_10px_var(--color-brand-orange)]" />
                                        <span className="text-brand-orange">SYSTEM ONLINE</span>
                                    </span>
                                </div>
                            </Command>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
