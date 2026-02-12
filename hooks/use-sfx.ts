"use client";

import { useCallback } from "react";

export function useSfx() {
    const playSound = useCallback((filename: string, volume = 0.5) => {
        if (typeof window === "undefined") return;

        try {
            const audio = new Audio(`/sounds/${filename}`);
            audio.volume = volume;
            audio.play().catch(() => {
                // Ignore playback errors (e.g., autoplay policy or missing file)
            });
        } catch (e) {
            // Ignore construction errors
        }
    }, []);

    const playHover = useCallback(() => playSound("hover_tick.mp3", 0.05), [playSound]);
    const playClick = useCallback(() => playSound("click_thud.mp3", 0.3), [playSound]);
    const playSuccess = useCallback(() => playSound("success_chime.mp3", 0.4), [playSound]);
    const playRiskAlert = useCallback(() => playSound("risk_hum.mp3", 0.15), [playSound]);

    return { playHover, playClick, playSuccess, playRiskAlert };
}
