"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLayoutEngine } from "@/hooks/useLayoutEngine";

interface LayoutIntelligenceProps {
    children: React.ReactNode;
    className?: string; // Optional className prop
}

export function LayoutIntelligence({ children, className }: LayoutIntelligenceProps) {
    const debugInfo = useLayoutEngine();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // We apply the 'zoom' via a CSS variable on the wrapper or body.
    // Ideally user wanted :root calculation, done above.

    // Fallback for hydration
    if (!mounted) return <div className="opacity-0">{children}</div>;

    return (
        <div
            className={cn("layout-intelligence-wrapper transition-all duration-300 ease-out min-h-screen flex flex-col items-center", className)}
            style={{
                // We use CSS zoom or transform: scale based on the var
                // Firefox doesn't support 'zoom' well, so transform is safer for cross-browser,
                // BUT 'zoom' affects layout flow (reflow), transform doesn't (composite).
                // For "shrinking UI" to fit more, 'zoom' is actually what we want, but it's non-standard.
                // Let's use a scale transform on the wrapper if --ui-zoom is set.
                // Or better: Use `font-size` scaling on root?
                // User asked for "Corrective scaling factor".

                // Let's try a safe transform approach for the wrapper.
                zoom: "var(--ui-zoom, 1)",
            }}
        >
            <div className="w-full max-w-[1920px] mx-auto">
                {children}
            </div>

            {/* Dev Debugger */}
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-4 left-4 z-[9999] px-4 py-2 bg-zinc-950/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400 rounded-lg shadow-2xl pointer-events-none flex flex-col gap-1 select-none">
                    <div className="flex justify-between gap-4"><span className="text-zinc-600">RES</span> <span className="text-zinc-200">{debugInfo.width}px</span></div>
                    <div className="flex justify-between gap-4"><span className="text-zinc-600">DPR</span> <span className="text-zinc-200">{debugInfo.dpr.toFixed(2)}</span></div>
                    <div className="flex justify-between gap-4"><span className="text-zinc-600">MODE</span> <span className="text-primary font-bold">{debugInfo.mode}</span></div>
                </div>
            )}
        </div>
    );
}
