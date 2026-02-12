import { useEffect, useRef, useCallback } from "react";

// Singleton AudioContext to prevent multiple contexts and handle auto-unlock globally
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isUnlocked = false;

export function useSoundEngine() {
    const initAudio = useCallback(() => {
        if (typeof window === "undefined") return;

        if (!audioCtx) {
            const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtxClass) {
                audioCtx = new AudioCtxClass();
                masterGain = audioCtx.createGain();
                masterGain.gain.value = 0.4; // Global Volume Cap
                masterGain.connect(audioCtx.destination);
            }
        }
    }, []);

    // Auto-Unlock Listener
    useEffect(() => {
        const unlock = () => {
            if (audioCtx && audioCtx.state === "suspended") {
                audioCtx.resume().then(() => {
                    isUnlocked = true;
                });
            }
            // Remove listeners once triggered
            window.removeEventListener("click", unlock);
            window.removeEventListener("keydown", unlock);
            window.removeEventListener("touchstart", unlock);
        };

        if (!isUnlocked) {
            initAudio(); // Ensure init
            window.addEventListener("click", unlock);
            window.addEventListener("keydown", unlock);
            window.addEventListener("touchstart", unlock);
        }
    }, [initAudio]);

    // --- Sound Palette ---

    // 1. Tick (Hover): High-pass filtered noise, very short (5ms)
    const playTick = useCallback(() => {
        if (!audioCtx || !masterGain) return;
        const t = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Using high frequency sine as a "cleaner" tick than pure noise for UI
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.005);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

        osc.start(t);
        osc.stop(t + 0.02);

        osc.connect(gain);
        gain.connect(masterGain);
    }, []);

    // 2. Press (Click): Low sine wave (120Hz), rapid decay
    const playPress = useCallback(() => {
        if (!audioCtx || !masterGain) return;
        const t = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.08); // Pitch drop

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.start(t);
        osc.stop(t + 0.1);

        osc.connect(gain);
        gain.connect(masterGain);
    }, []);

    // 3. Release (Action): Higher sine (200Hz), slight ring
    const playRelease = useCallback(() => {
        if (!audioCtx || !masterGain) return;
        const t = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.1); // Pitch rise

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.start(t);
        osc.stop(t + 0.15);

        osc.connect(gain);
        gain.connect(masterGain);
    }, []);

    // 4. Success (Validation): Major 3rd Chime
    const playSuccess = useCallback(() => {
        if (!audioCtx || !masterGain) return;
        const t = audioCtx.currentTime;

        // Note 1: C5 (523.25 Hz)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.frequency.value = 523.25;

        // Note 2: E5 (659.25 Hz)
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.frequency.value = 659.25;

        // Staggered Envelope
        gain1.gain.setValueAtTime(0, t);
        gain1.gain.linearRampToValueAtTime(0.2, t + 0.05);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

        gain2.gain.setValueAtTime(0, t);
        gain2.gain.linearRampToValueAtTime(0.2, t + 0.1); // Slight delay
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

        osc1.start(t);
        osc1.stop(t + 0.6);
        osc2.start(t);
        osc2.stop(t + 0.8);

        osc1.connect(gain1);
        gain1.connect(masterGain);
        osc2.connect(gain2);
        gain2.connect(masterGain);
    }, []);

    // 5. Glitch (Error): Sawtooth with Jitter
    const playGlitch = useCallback(() => {
        if (!audioCtx || !masterGain) return;
        const t = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.linearRampToValueAtTime(50, t + 0.05);
        osc.frequency.linearRampToValueAtTime(200, t + 0.1);
        osc.frequency.linearRampToValueAtTime(50, t + 0.15);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.start(t);
        osc.stop(t + 0.15);

        osc.connect(gain);
        gain.connect(masterGain);
    }, []);

    return { playTick, playPress, playRelease, playSuccess, playGlitch };
}
