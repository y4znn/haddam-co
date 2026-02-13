"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, MessageSquare, Truck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Driver {
    id: string;
    name: string;
    cash_balance: number;
    status: string;
}

interface DriverModalProps {
    isOpen: boolean;
    onClose: () => void;
    drivers: Driver[];
    totalFloatingCash: number;
}

export function DriverModal({ isOpen, onClose, drivers, totalFloatingCash }: DriverModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div>
                                <h2 className="text-xl font-heading font-bold text-white">Dispatch Command</h2>
                                <p className="text-sm text-muted-foreground font-mono">LIQUIDITY COLLECTION: ${totalFloatingCash.toLocaleString()}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Driver List */}
                        <div className="p-4 space-y-3 bg-black">
                            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest px-2 mb-2">High Value Targets</p>

                            {drivers.map((driver) => {
                                const isHighBalance = driver.cash_balance > 1000;

                                return (
                                    <div key={driver.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <Truck className="w-5 h-5 text-white/50" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{driver.name}</div>
                                                <div className={cn(
                                                    "text-xs font-mono font-bold flex items-center gap-1",
                                                    isHighBalance ? "text-[var(--reactor-purple)]" : "text-emerald-500"
                                                )}>
                                                    ${driver.cash_balance.toLocaleString()} {isHighBalance && <AlertTriangle className="w-3 h-3" />}
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href={`https://wa.me/?text=URGENT: Remit cash collection of $${driver.cash_balance} immediately to HQ. Order IDs pending...`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button
                                                variant={isHighBalance ? "solid" : "outline"}
                                                size="sm"
                                                className={cn(
                                                    isHighBalance ? "bg-[var(--reactor-purple)] hover:bg-[var(--reactor-purple)]/80 border-none text-white" : ""
                                                )}
                                            >
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Collect
                                            </Button>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
