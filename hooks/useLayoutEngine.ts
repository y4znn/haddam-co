"use client";

import { useState, useEffect } from "react";

export function useLayoutEngine() {
    const [debugInfo, setDebugInfo] = useState({ width: 0, dpr: 1, mode: "Normal" });

    useEffect(() => {
        const analyzeLayout = () => {
            if (typeof window === "undefined") return;

            const width = window.innerWidth;
            const dpr = window.devicePixelRatio || 1;
            let mode = "Normal";

            const root = document.documentElement;

            // Diagnosis Logic
            // 1. Reset
            root.style.removeProperty("--ui-zoom");
            root.classList.remove("ui-dense", "ui-wide");

            // 2. Logic
            if (width < 1400 && dpr >= 1.25) {
                // High DPI Laptop -> Shrink
                mode = "High Density (Laptop)";
                root.style.setProperty("--ui-zoom", "0.85");
                root.classList.add("ui-dense");
            } else if (width > 1800) {
                // Ultrawide -> Clamp/Scale? 
                // Currently just marking it.
                mode = "Ultrawide";
                root.classList.add("ui-wide");
            }

            setDebugInfo({ width, dpr, mode });
        };

        analyzeLayout();
        window.addEventListener("resize", analyzeLayout);
        return () => window.removeEventListener("resize", analyzeLayout);
    }, []);

    return debugInfo;
}
