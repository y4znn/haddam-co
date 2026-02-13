"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterState } from "@/hooks/useProductFilter";
import { Button } from "@/components/ui/button";

interface FilterHUDProps {
    filters: FilterState;
    setSearch: (q: string) => void;
    setCategory: (c: string | null) => void;
    setBrand: (b: string | null) => void;
    setPriceRange: (range: [number, number]) => void;
    toggleStock: () => void;
    setSort: (s: FilterState['sort']) => void;
    resetFilters: () => void;
}

const CATEGORIES = ["appliances", "electronics", "kitchen", "beauty", "sound", "tools"];
const BRANDS = ["Samsung", "LG", "Philips", "Braun", "Tefal", "Sharp", "General Pro"];

export function FilterHUD({
    filters,
    setSearch,
    setCategory,
    setBrand,
    setPriceRange,
    toggleStock,
    setSort,
    resetFilters
}: FilterHUDProps) {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
            className="sticky top-24 z-40 w-full max-w-7xl mx-auto mb-12"
        >
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl p-4 md:p-6 flex flex-col gap-6">

                {/* Bento Row 1: Search & Toggles */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search Module */}
                    <div className="relative w-full md:w-1/3 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-brand-orange transition-colors" />
                        <input
                            type="text"
                            placeholder="Search quantum inventory..."
                            value={filters.searchQuery}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange/50 focus:bg-white/10 transition-all font-mono text-sm"
                        />
                    </div>

                    {/* Mechanical Switches Module */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={toggleStock}>
                            <motion.div
                                className={cn(
                                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                                    filters.inStockOnly ? "bg-brand-orange/20 border border-brand-orange" : "bg-white/5 border border-white/10"
                                )}
                            >
                                <motion.div
                                    className={cn("absolute top-1 w-4 h-4 rounded-full bg-current shadow-lg")}
                                    animate={{ left: filters.inStockOnly ? "calc(100% - 20px)" : "4px" }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    style={{ color: filters.inStockOnly ? "brand-orange" : "#71717a" }}
                                />
                            </motion.div>
                            <span className={cn("text-xs font-bold tracking-widest uppercase transition-colors", filters.inStockOnly ? "text-brand-orange" : "text-muted-foreground")}>
                                In Stock
                            </span>
                        </div>

                        {/* Reset Trigger */}
                        {(filters.searchQuery || filters.category || filters.brand || filters.inStockOnly) && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-2 text-xs text-destructive hover:text-destructive/80 transition-colors uppercase font-bold tracking-widest"
                            >
                                <X className="w-4 h-4" /> Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Vertical Divider Line (Visual only) */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Bento Row 2: Categories, Brands & Price */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                    {/* Filters Container */}
                    <div className="flex flex-col gap-4 w-full md:w-auto">

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-2">Core:</span>
                            <button
                                onClick={() => setCategory(null)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] font-bold tracking-wide uppercase",
                                    filters.category === null
                                        ? "bg-brand-orange text-black border-brand-orange shadow-[0_0_10px_var(--orbital-ice)]"
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                All
                            </button>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] font-bold tracking-wide uppercase",
                                        filters.category === cat
                                            ? "bg-brand-orange text-black border-brand-orange shadow-[0_0_10px_var(--orbital-ice)]"
                                            : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Brands */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-2">Partner:</span>
                            {BRANDS.map(brand => (
                                <button
                                    key={brand}
                                    onClick={() => setBrand(filters.brand === brand ? null : brand)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] font-bold tracking-wide uppercase",
                                        filters.brand === brand
                                            ? "bg-brand-orange text-black border-brand-orange shadow-[0_0_10px_var(--orbital-ice)]"
                                            : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                    )}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Price Range Fader */}
                    <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px] mt-4 md:mt-0">
                        <span className="text-xs text-muted-foreground font-mono">MAX: ${filters.priceRange[1]}</span>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={filters.priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full h-[2px] bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-orange hover:accent-brand-orange/80"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
