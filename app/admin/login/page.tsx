"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const controls = useAnimation();
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        // Auto-focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple chars
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check completion
        if (newPin.every(digit => digit !== "") && index === 5) {
            verifyPin(newPin.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyPin = async (enteredPin: string) => {
        if (enteredPin === "123456") { // Mock Correct PIN
            setStatus('success');
            await controls.start({
                scale: 1.05,
                borderColor: "#10B981", // Emerald 500
                transition: { duration: 0.2 }
            });
            setTimeout(() => router.push('/admin/dashboard'), 800);
        } else {
            setStatus('error');
            // Shake Animation
            await controls.start({
                x: [-10, 10, -10, 10, 0],
                borderColor: "#EF4444", // Red 500
                transition: { duration: 0.4 }
            });
            setPin(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
            setTimeout(() => setStatus('idle'), 1000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

            {/* Glass Pad Container */}
            <motion.div
                className={cn(
                    "relative z-10 w-full max-w-md p-10 rounded-3xl flex flex-col items-center gap-8",
                    "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl",
                    status === 'error' && "border-red-500/50 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]",
                    status === 'success' && "border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
                )}
                animate={controls}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        {status === 'success' ? (
                            <ShieldCheck className="w-8 h-8 text-emerald-500 animate-pulse" />
                        ) : status === 'error' ? (
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        ) : (
                            <Lock className="w-8 h-8 text-white/70" />
                        )}
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-wide">SECURE ACCESS</h1>
                    <p className="text-sm text-muted-foreground font-mono bg-white/5 px-3 py-1 rounded-full inline-block border border-white/5">
                        BIO-METRIC AUTHENTICATION REQUIRED
                    </p>
                </div>

                {/* Segmented Input */}
                <div className="flex gap-3">
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            type="password"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={cn(
                                "w-12 h-16 rounded-xl bg-black/40 border border-white/10 text-center text-2xl font-mono text-white focus:ring-0 focus:outline-none transition-all duration-300",
                                "focus:border-brand-orange focus:shadow-[0_0_15px_-3px_rgba(255,107,0,0.5)]",
                                status === 'success' && "border-emerald-500 text-emerald-500",
                                status === 'error' && "border-red-500 text-red-500"
                            )}
                        />
                    ))}
                </div>

                <p className="text-xs text-muted-foreground/50 font-mono tracking-widest uppercase">
                    {status === 'error' ? "ACCESS DENIED" : status === 'success' ? "ACCESS GRANTED" : "ENTER 6-DIGIT SECURITY PIN"}
                </p>
            </motion.div>
        </div>
    );
}
