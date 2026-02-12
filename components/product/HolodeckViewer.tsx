"use client";

import { motion, useMotionValue, useSpring, useTransform, PanInfo } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HolodeckViewerProps {
    image: string;
    name: string;
    badge?: string;
}

export function HolodeckViewer({ image, name, badge }: HolodeckViewerProps) {
    const x = useMotionValue(0);
    const textX = useMotionValue(0);

    // Physics: Inertia & Momentum
    const xSpring = useSpring(x, { stiffness: 400, damping: 30 });
    const rotateY = useTransform(xSpring, [-200, 200], ["-25deg", "25deg"]);
    const textRotateY = useTransform(xSpring, [-200, 200], ["15deg", "-15deg"]); // Text moves opposite for parallax

    // Gloss/Sheen effect moves across the surface
    const sheenX = useTransform(xSpring, [-200, 200], ["100%", "-100%"]);

    function handlePan(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        x.set(info.offset.x / 2);
    }

    function handlePanEnd() {
        x.set(0);
    }

    return (
        <div className="relative w-full aspect-square flex items-center justify-center perspective-[2000px] overflow-visible group cursor-grab active:cursor-grabbing">
            {/* The Plinth / Stage */}
            <div className="absolute bottom-10 w-2/3 h-1/3 bg-white/5 rounded-[100%] blur-3xl opacity-20 transform rotate-x-[70deg] pointer-events-none" />

            {/* Floating Container with 3D Physics */}
            <motion.div
                style={{ rotateY: rotateY, rotateX: "5deg" }}
                className="relative z-10 w-3/4 h-3/4 transform-style-3d preserve-3d"
                onPan={handlePan}
                onPanEnd={handlePanEnd}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Badge (Floating Layer 1) */}
                {badge && (
                    <motion.div
                        style={{ z: 40, rotateY: textRotateY }}
                        className="absolute -top-4 -right-4 z-50 pointer-events-none"
                    >
                        <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1.5 text-sm shadow-[0_0_20px_rgba(255,107,0,0.5)]">
                            {badge}
                        </Badge>
                    </motion.div>
                )}

                {/* Main Product Image (Layer 0) */}
                <div className="relative w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain pointer-events-none"
                        priority
                    />

                    {/* Interactive Sheen Overlay */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <motion.div
                            style={{ x: sheenX }}
                            className="w-[200%] h-full absolute top-0 left-[-50%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                </div>

                {/* Reflection (Layer -1) */}
                <div className="absolute -bottom-full left-0 w-full h-full opacity-30 pointer-events-none"
                    style={{
                        transform: "scaleY(-1) translateY(-10%)",
                        maskImage: "linear-gradient(to bottom, transparent 60%, black 100%)",
                        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)"
                    }}>
                    <Image
                        src={image}
                        alt=""
                        fill
                        className="object-contain" // blur-sm
                    />
                </div>
            </motion.div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex items-center gap-2 text-xs font-mono text-white/40 tracking-widest">
                <span>[ DRAG TO ROTATE ]</span>
            </div>
        </div>
    );
}
