"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function ReticleCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "BUTTON" || target.tagName === "A" || target.tagName === "INPUT" || target.closest("button") || target.closest("a") || target.closest(".cursor-pointer")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block",
                !isVisible && "opacity-0"
            )}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <motion.div
                className={cn(
                    "w-full h-full border border-cyan-400 rounded-full flex items-center justify-center transition-all duration-200",
                    isHovering ? "scale-150 bg-cyan-400/20 border-cyan-400" : "scale-100 border-cyan-400/50"
                )}
            >
                <div className={cn(
                    "w-1 h-1 bg-cyan-400 rounded-full transition-all duration-200",
                    isHovering ? "w-0 h-0" : "w-1 h-1"
                )} />
            </motion.div>

            {/* Crosshair Lines */}
            <div className="absolute top-1/2 left-[-8px] w-2 h-[1px] bg-cyan-400/30" />
            <div className="absolute top-1/2 right-[-8px] w-2 h-[1px] bg-cyan-400/30" />
            <div className="absolute top-[-8px] left-1/2 w-[1px] h-2 bg-cyan-400/30" />
            <div className="absolute bottom-[-8px] left-1/2 w-[1px] h-2 bg-cyan-400/30" />
        </motion.div>
    );
}
