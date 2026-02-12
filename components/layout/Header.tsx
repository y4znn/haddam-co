"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "@/components/cart/CartSheet";

export function Header() {
    const pathname = usePathname();
    const { items } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Secure Enclave: Hide Global Nav on Checkout
    if (pathname === "/checkout") return null;
    // Simple hover state tracking for tooltips is handled per-item or could be done here.
    // We will let each item handle its own hover state for simplicity via Framer Motion's whileHover, 
    // but for the tooltip *mounting*, we might want local state or just CSS/AnimatePresence.
    // Let's use a local state for the tooltip label to ensure only one shows at a time if needed, 
    // but individual item state is smoother for parallel animations.

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto">
            {/* The Industrial Dock Container */}
            <motion.div
                className={cn(
                    "flex items-center gap-2 px-6 h-16 rounded-full relative overflow-hidden",
                    "bg-glass-surface backdrop-blur-2xl border border-glass-border",
                    "shadow-glass-double"
                )}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-0" />

                {/* Content Container (z-10) */}
                <div className="relative z-10 flex items-center gap-2">
                    {/* Home */}
                    <DockItem
                        href="/"
                        label="Home"
                        isActive={pathname === "/"}
                    >
                        <Home className="w-6 h-6 text-foreground" />
                    </DockItem>

                    {/* Vertical Divider */}
                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Smart Search - Event Dispatch Trigger */}
                    <DockItemButton
                        label="Search"
                        onClick={() => {
                            // Dispatch Custom Event "open-search-palette"
                            window.dispatchEvent(new CustomEvent('open-search-palette'));
                        }}
                    >
                        <Search className="w-6 h-6 text-foreground" />
                    </DockItemButton>

                    {/* Hidden Command Palette Controller */}
                    <div className="hidden">
                        <CommandPalette>
                            <span />
                        </CommandPalette>
                    </div>

                    {/* Cart */}
                    <CartSheet>
                        <DockItemButton label="Cart">
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6 text-foreground" />
                                {mounted && items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white border border-black">
                                        {items.length}
                                    </span>
                                )}
                            </div>
                        </DockItemButton>
                    </CartSheet>

                </div>
            </motion.div>
        </div>
    );
}

// Wrapper for Link items with Evolving Underline & Active Glow
function DockItem({ href, label, children, isActive = false }: { href: string, label: string, children: React.ReactNode, isActive?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href} aria-label={label} legacyBehavior passHref className="flex items-center justify-center">
            {/* Link needs flex to respect dimensions of children properly in this context */}
            <motion.div
                className="relative flex items-center justify-center w-12 h-12 shrink-0 aspect-square rounded-full cursor-pointer group"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.97 }} // Micro-Squish
                transition={{ type: "spring", stiffness: 400, damping: 15 }} // Haptic Physics
            >
                {/* Glass Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 5, x: "-50%" }}
                            className="absolute -top-12 left-1/2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs rounded-md shadow-xl whitespace-nowrap pointer-events-none"
                        >
                            {label}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Icon Container with Glass Effect & Active Glow */}
                <div
                    className={cn(
                        "flex items-center justify-center w-full h-full rounded-full bg-white/5 border border-white/5 transition-all text-white",
                        "group-hover:bg-white/10 group-hover:border-white/20 pointer-events-none",
                        isActive ? "shadow-[0_0_15px_rgba(255,107,0,0.3)] border-brand-orange/30" : ""
                    )}
                    style={{
                        textShadow: isActive ? "0 0 10px rgba(255,107,0,0.5)" : "none"
                    }}
                >
                    {children}
                </div>

                {/* Evolving Underline (Dot to Line) */}
                {isActive && (
                    <motion.div
                        layoutId="dock-active"
                        className="absolute -bottom-1 h-1 bg-brand-orange rounded-full shadow-neon-glow pointer-events-none"
                        initial={{ width: 4 }}
                        animate={{ width: isHovered ? 24 : 4 }} // Evolve on hover
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                )}
            </motion.div>
        </Link>
    );
}

// Wrapper for Button items (Search, Cart) - Non-Link interactions
function DockItemButton({ label, children, onClick }: { label: string, children: React.ReactNode, onClick?: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            className="relative flex items-center justify-center w-12 h-12 shrink-0 aspect-square rounded-full cursor-pointer group outline-none z-50 pointer-events-auto"
            aria-label={label}
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            {/* Glass Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 5, x: "-50%" }}
                        className="absolute -top-12 left-1/2 px-3 py-1 bg-popover/80 backdrop-blur-md border border-border text-popover-foreground text-xs rounded-md shadow-xl whitespace-nowrap pointer-events-none"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Icon Container with Glass Effect */}
            <div className="flex items-center justify-center w-full h-full rounded-full bg-white/5 border border-white/5 transition-colors group-hover:bg-accent/10 group-hover:border-accent/20 pointer-events-none">
                {children}
            </div>
        </motion.button>
    );
}
