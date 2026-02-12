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
    Laptop,
    Shirt,
    Wrench,
    Zap,
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
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export function CommandMenu({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
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
            <div onClick={() => setOpen(true)} className="cursor-pointer w-full h-full">
                {children || (
                    <div className="hidden md:flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:bg-white/10 transition-colors">
                        <Search className="w-3 h-3" />
                        <span>Search...</span>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-muted/20 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                )}
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="glass-panel border-none">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => runCommand(() => router.push('/category/electronics'))}>
                            <Laptop className="mr-2 h-4 w-4" />
                            <span>Electronics</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/category/appliances'))}>
                            <Zap className="mr-2 h-4 w-4" />
                            <span>Appliances</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/category/tools'))}>
                            <Wrench className="mr-2 h-4 w-4" />
                            <span>Tools</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/checkout'))}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Checkout</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
