"use client";

import { motion } from "framer-motion";
import { Truck, Wrench, ShieldCheck, Headset } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Express Delivery",
        description: "White-glove delivery service to your doorstep within 48 hours.",
        color: "text-logo-blue",
        bg: "bg-logo-blue/10",
    },
    {
        icon: Wrench,
        title: "Expert Installation",
        description: "Certified technicians to get your new appliances up and running.",
        color: "text-[var(--reactor-purple)]",
        bg: "bg-[var(--reactor-purple)]/10",
    },
    {
        icon: ShieldCheck,
        title: "Extended Warranty",
        description: "Comprehensive protection plans for total peace of mind.",
        color: "text-brand-core",
        bg: "bg-brand-core/10",
    },
    {
        icon: Headset,
        title: "24/7 Support",
        description: "Our appliance experts are always here to help with any questions.",
        color: "text-logo-teal",
        bg: "bg-logo-teal/10",
    },
];

export function FeaturesGrid() {
    return (
        <section className="container mx-auto px-4 py-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-colors"
                    >
                        <div className={`w-14 h-14 ${feature.bg} rounded-full flex items-center justify-center mb-4`}>
                            <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <h4 className="font-heading font-bold text-lg text-white mb-2">
                            {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
