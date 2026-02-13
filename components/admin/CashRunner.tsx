"use client";

import { motion } from "framer-motion";
import { DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useSoundEngine } from "@/hooks/use-sound-engine";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface CashRunnerProps {
    amount: number;
    currency?: string;
    onClick?: () => void;
}

export function CashRunner({ amount, currency = "USD", onClick }: CashRunnerProps) {
    const isHighRisk = amount > 1000;
    const { playGlitch, playTick } = useSoundEngine();

    useEffect(() => {
        if (isHighRisk) {
            playGlitch();
        }
        playTick(); // Tick on value update/mount
    }, [isHighRisk, playGlitch, playTick, amount]);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative p-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 group h-full flex flex-col justify-between",
                "bg-black/40 backdrop-blur-xl border",
                isHighRisk
                    ? "border-[var(--reactor-purple)]/30 hover:border-[var(--reactor-purple)]/60 shadow-[0_0_30px_-10px_rgba(176,38,255,0.3)] hover:shadow-[0_0_50px_-10px_rgba(176,38,255,0.5)]"
                    : "border-cyan-500/30 hover:border-cyan-500/60 shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)]"
            )}
        >
            {/* Background Glow */}
            <div className={cn(
                "absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-colors duration-700",
                isHighRisk ? "bg-[var(--reactor-purple)]" : "bg-cyan-500"
            )} />

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="font-heading font-bold text-sm tracking-widest text-muted-foreground mb-1 uppercase">
                        Floating Liquidity
                    </h3>
                    <div className="flex items-center gap-2">
                        {isHighRisk ? (
                            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[var(--reactor-purple)] bg-[var(--reactor-purple)]/10 px-2 py-0.5 rounded border border-[var(--reactor-purple)]/20">
                                <AlertTriangle className="w-3 h-3" />
                                HIGH RISK • COLLECT NOW
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                                <CheckCircle2 className="w-3 h-3" />
                                STABLE
                            </span>
                        )}
                    </div>
                </div>

                <div className={cn(
                    "p-3 rounded-xl border transition-colors",
                    isHighRisk ? "bg-[var(--reactor-purple)]/10 border-[var(--reactor-purple)]/20 text-[var(--reactor-purple)]" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-500"
                )}>
                    <DollarSign className="w-6 h-6" />
                </div>
            </div>

            <div className="relative z-10 mt-8">
                <div className="font-mono text-5xl md:text-6xl font-bold tracking-tighter text-white tabular-nums">
                    ${amount.toLocaleString()}
                </div>
                <div className="font-mono text-xs text-muted-foreground/50 mt-2 flex items-center justify-between">
                    <span>PENDING DRIVER REMITTANCE</span>
                    <span className="opacity-50">LBP PEGGED (SIM)</span>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20 mix-blend-overlay" />
        </motion.div>
    );
}
