"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart, Line, BarChart, Bar,
    Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { Activity, Box, ShieldCheck, Zap, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminOrders, drivers } from "@/lib/mock-data-admin";
import { CashRunner } from "@/components/admin/CashRunner";
import { TheLedger } from "@/components/admin/TheLedger";
import { DriverModal } from "@/components/admin/DriverModal";

// Mock Data for "Traffic Pulse"
const trafficData = [
    { time: '00:00', users: 120 }, { time: '04:00', users: 80 },
    { time: '08:00', users: 450 }, { time: '12:00', users: 980 },
    { time: '16:00', users: 850 }, { time: '20:00', users: 600 },
    { time: '23:59', users: 340 },
];

// Mock Data for "Inventory Heatmap"
const inventoryData = [
    { name: 'Neo QLED', stock: 45 },
    { name: 'OLED Evo', stock: 12 }, // Low Stock
    { name: 'Series 9', stock: 85 },
    { name: 'Airfryer', stock: 8 },  // Critical
    { name: 'Dyson V15', stock: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/80 backdrop-blur-2xl border border-white/20 p-3 rounded-lg shadow-xl">
                <p className="font-mono text-xs text-muted-foreground mb-1">{label}</p>
                <p className="font-bold text-brand-orange">
                    {payload[0].value} {payload[0].dataKey === 'users' ? 'ACTIVE' : 'UNITS'}
                </p>
            </div>
        );
    }
    return null;
};

export default function AdminDashboard() {
    const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

    // Calculate Total Floating Cash (only pending_cash)
    const floatingCash = adminOrders
        .filter(o => o.payment_status === 'pending_cash')
        .reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8 pb-32 relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
                {/* Header */}
                <div className="flex items-end justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">OVERLORD COMMAND</h1>
                        <p className="font-mono text-xs text-brand-orange flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            System Optimal • v.2.4.0
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-muted-foreground font-mono">SERVER TIME</p>
                        <p className="text-xl font-mono">22:45:12 UTC</p>
                    </div>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-[800px]">

                    {/* 1. CashRunner (Liquidity Monitor) - Large Top Left */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
                        <CashRunner
                            amount={floatingCash}
                            onClick={() => setIsDriverModalOpen(true)}
                        />
                    </div>

                    {/* 2. Order Velocity (Daily Count) - Small Card */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1">
                        <DashboardCard
                            title="Daily Velocity"
                            icon={<Zap className="text-cyan-400" />}
                            value={adminOrders.length.toString()}
                            sub="+120%"
                        />
                    </div>

                    {/* 3. System Health - Small Card */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1">
                        <DashboardCard
                            title="System Health"
                            icon={<ShieldCheck className="text-emerald-500" />}
                            value="100%"
                            sub="Optimal"
                        />
                    </div>

                    {/* 4. Active Users & Traffic Pulse - Wide Chart */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-2 row-span-2 glass-panel p-6 rounded-3xl flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading font-bold flex items-center gap-2">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                TRAFFIC PULSE
                            </h3>
                        </div>
                        <div className="flex-1 w-full min-h-[100px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trafficData}>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#22d3ee" // Cyan
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#000", stroke: "#22d3ee", strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: "#22d3ee" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 5. Inventory Heatmap - Mid */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 glass-panel p-6 rounded-3xl flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-heading font-bold flex items-center gap-2 text-sm text-muted-foreground">
                                <Box className="w-4 h-4 text-brand-orange" />
                                STOCK ALERTS
                            </h3>
                        </div>
                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={inventoryData}>
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                    <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
                                        {inventoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.stock < 20 ? '#EF4444' : '#10B981'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 6. The Ledger (Recent Orders) - Wide Bottom */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-6 row-span-3">
                        <TheLedger orders={adminOrders} />
                    </div>

                </div>
            </div>

            <DriverModal
                isOpen={isDriverModalOpen}
                onClose={() => setIsDriverModalOpen(false)}
                drivers={drivers}
                totalFloatingCash={floatingCash}
            />
        </div>
    );
}

function DashboardCard({ title, icon, value, sub }: any) {
    return (
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover:border-brand-orange/50 transition-colors group h-full">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">{title}</span>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
            </div>
            <div>
                <div className="text-3xl font-bold font-heading mb-1">{value}</div>
                <div className="text-xs text-muted-foreground/60 font-mono">{sub}</div>
            </div>
        </div>
    )
}

