"use client";

import * as React from "react";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
    ShoppingCart,
    Truck,
    Moon,
    Sun,
    Laptop
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
                <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 text-xs font-mono text-muted-foreground shadow-xl flex items-center gap-2">
                    <span>CMD-K</span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                </div>
            </div>

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                data-state={open ? "open" : "closed"}
            >
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setOpen(false)} />

                    {/* Dialog Content */}
                    <div className="relative z-50 w-full max-w-lg bg-[#0F172A]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center border-b border-white/10 px-3" cmdk-input-wrapper="">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <CommandInput
                                placeholder="Type a command or search..."
                                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-white"
                            />
                        </div>
                        <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-2">
                            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">No results found.</CommandEmpty>

                            <CommandGroup heading="Navigation" className="text-xs text-muted-foreground font-mono uppercase tracking-widest px-2 py-1.5">
                                <CommandItem onSelect={() => runCommand(() => router.push('/'))} className="flex items-center px-2 py-2 rounded-md hover:bg-white/10 hover:text-cyan-400 cursor-pointer transition-colors text-sm text-white group">
                                    <Laptop className="mr-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    <span>Home</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/products'))} className="flex items-center px-2 py-2 rounded-md hover:bg-white/10 hover:text-cyan-400 cursor-pointer transition-colors text-sm text-white group">
                                    <ShoppingBag className="mr-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    <span>Products</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/checkout'))} className="flex items-center px-2 py-2 rounded-md hover:bg-white/10 hover:text-cyan-400 cursor-pointer transition-colors text-sm text-white group">
                                    <CreditCard className="mr-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    <span>Checkout</span>
                                </CommandItem>
                            </CommandGroup>

                            <CommandSeparator className="h-px bg-white/10 my-1 mx-2" />

                            <CommandGroup heading="System" className="text-xs text-muted-foreground font-mono uppercase tracking-widest px-2 py-1.5">
                                <CommandItem onSelect={() => runCommand(() => setTheme("dark"))} className="flex items-center px-2 py-2 rounded-md hover:bg-white/10 hover:text-cyan-400 cursor-pointer transition-colors text-sm text-white group">
                                    <Moon className="mr-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    <span>Dark Mode</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => setTheme("light"))} className="flex items-center px-2 py-2 rounded-md hover:bg-white/10 hover:text-cyan-400 cursor-pointer transition-colors text-sm text-white group">
                                    <Sun className="mr-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    <span>Light Mode</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>

                        <div className="border-t border-white/10 bg-white/5 px-4 py-2 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-muted-foreground">ORBITAL OS v2.0</span>
                            <div className="flex gap-2 text-[10px] text-muted-foreground">
                                <span className="bg-white/10 px-1.5 rounded">↑↓</span>
                                <span>to navigate</span>
                                <span className="bg-white/10 px-1.5 rounded">↵</span>
                                <span>to select</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CommandDialog>
        </>
    );
}

// Icon wrapper to avoid missing icon errors if lucide version mismatch
function ShoppingBag(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
