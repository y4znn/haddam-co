"use client";

import { Order } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertOctagon } from "lucide-react";

interface TheLedgerProps {
    orders: Order[];
}

export function TheLedger({ orders }: TheLedgerProps) {
    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-full font-mono">
            {/* Terminal Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-core animate-pulse" />
                    Live Ledger
                </h3>
                <span className="text-[10px] text-muted-foreground/50">ENCRYPTED CONNECTION</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-auto p-2 space-y-1">
                {orders.map((order, i) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer relative overflow-hidden"
                    >
                        {/* Hover Highlight Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-core opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* ID */}
                        <div className="w-24 shrink-0 text-xs text-brand-core font-bold">
                            {order.id}
                        </div>

                        {/* Customer */}
                        <div className="w-40 shrink-0 text-sm font-sans text-white/90 truncate">
                            {order.customer.name}
                        </div>

                        {/* Location */}
                        <div className="flex-1 text-xs text-muted-foreground truncate font-sans">
                            {order.customer.city} <span className="text-white/20">•</span> {order.customer.address}
                        </div>

                        {/* Driver */}
                        <div className="w-32 text-[10px] text-muted-foreground/70 uppercase tracking-wider shrink-0 hidden lg:block text-right">
                            {order.driver_assigned || "UNASSIGNED"}
                        </div>

                        {/* Amount */}
                        <div className="w-24 shrink-0 text-right font-bold text-white tabular-nums">
                            ${order.total.toFixed(2)}
                        </div>

                        {/* Status Type */}
                        <div className="w-32 shrink-0 flex justify-end">
                            {order.payment_status === 'pending_cash' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-wide shadow-[0_0_10px_-5px_var(--orbital-ice)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                    COD PENDING
                                </span>
                            )}
                            {order.payment_status === 'paid' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wide">
                                    <CheckCircle2 className="w-3 h-3" />
                                    PAID
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
