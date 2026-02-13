"use client";

import { useSoundEngine } from "@/hooks/use-sound-engine";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressFormProps {
    formData: {
        name: string;
        phone: string;
        city: string;
        address: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValidationChange: (isValid: boolean) => void;
}

export function AddressForm({ formData, onChange, onValidationChange }: AddressFormProps) {
    const [addressStatus, setAddressStatus] = useState<'idle' | 'scanning' | 'valid' | 'invalid'>('idle');
    const [touched, setTouched] = useState(false);
    const { playSuccess, playGlitch } = useSoundEngine();

    // Simulated Predictive Validation
    useEffect(() => {
        const validate = async () => {
            if (!formData.address) {
                setAddressStatus('idle');
                onValidationChange(false);
                return;
            }

            if (formData.address.length < 5) return; // Too short to start scanning

            setAddressStatus('scanning');

            // Simulate AI Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (formData.address.length > 10) {
                setAddressStatus('valid');
                onValidationChange(true);
                playSuccess();
            } else {
                setAddressStatus('invalid');
                onValidationChange(false);
                playGlitch();
            }
        };

        const timer = setTimeout(validate, 500); // Debounce
        return () => clearTimeout(timer);
    }, [formData.address, onValidationChange]);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={onChange} required className="bg-white/5 border-white/10 focus:border-brand-core/50 transition-colors" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number (Lebanon)</Label>
                    <Input id="phone" name="phone" placeholder="+961 70 123456" value={formData.phone} onChange={onChange} required className="bg-white/5 border-white/10 focus:border-brand-core/50 transition-colors" />
                    <p className="text-xs text-muted-foreground">We will confirm via WhatsApp/Call.</p>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="city">City / Area</Label>
                    <Input id="city" name="city" placeholder="Beirut, Achrafieh" value={formData.city} onChange={onChange} required className="bg-white/5 border-white/10 focus:border-brand-core/50 transition-colors" />
                </div>

                {/* Holographic Address Field */}
                <div className="grid gap-2 relative">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="address">Detailed Address</Label>
                        <AnimatePresence mode="wait">
                            {addressStatus === 'scanning' && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-[10px] font-mono text-[var(--orbital-ice)] flex items-center gap-1"
                                >
                                    <Loader2 className="w-3 h-3 animate-spin" /> SCANNING...
                                </motion.span>
                            )}
                            {addressStatus === 'valid' && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1"
                                >
                                    <motion.div layoutId="secure-lock">
                                        <Lock className="w-3 h-3" />
                                    </motion.div>
                                    VERIFIED
                                </motion.span>
                            )}
                            {addressStatus === 'invalid' && (
                                <motion.span
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[10px] font-mono text-red-500 font-bold flex items-center gap-1"
                                >
                                    <AlertCircle className="w-3 h-3" />
                                    INVALID
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative">
                        <motion.div
                            animate={addressStatus === 'invalid' ? { x: [-2, 2, -2, 2, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <Input
                                id="address"
                                name="address"
                                placeholder="Street, Building, Floor..."
                                value={formData.address}
                                onChange={onChange}
                                onBlur={() => setTouched(true)}
                                required
                                className={cn(
                                    "pr-10 bg-white/5 border-white/10 transition-all duration-500",
                                    addressStatus === 'scanning' && "border-[var(--orbital-ice)]/50 shadow-[0_0_15px_-5px_var(--orbital-ice)]",
                                    addressStatus === 'valid' && "border-emerald-500/50 shadow-[0_0_15px_-5px_#10B981]",
                                    addressStatus === 'invalid' && "border-red-500/50 shadow-[0_0_15px_-5px_#EF4444]"
                                )}
                            />
                        </motion.div>

                        {/* Status Icon Overlay */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            {addressStatus === 'valid' && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <Lock className="w-4 h-4 text-emerald-500" />
                                </motion.div>
                            )}
                            {addressStatus === 'scanning' && (
                                <div className="w-2 h-2 rounded-full bg-[var(--orbital-ice)] animate-pulse" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
