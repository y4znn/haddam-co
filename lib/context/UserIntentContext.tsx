"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type IntentType = "neutral" | "luxury" | "utilitarian";

interface UserIntentContextType {
    intent: IntentType;
    registerInteraction: (category: string, duration: number) => void;
}

const UserIntentContext = createContext<UserIntentContextType>({
    intent: "neutral",
    registerInteraction: () => { },
});

export function UserIntentProvider({ children }: { children: React.ReactNode }) {
    const [intent, setIntent] = useState<IntentType>("neutral");
    const [interactions, setInteractions] = useState<Record<string, number>>({});

    const registerInteraction = (category: string, duration: number) => {
        setInteractions(prev => {
            const newCount = (prev[category] || 0) + duration;
            analyzeIntent(category, newCount);
            return { ...prev, [category]: newCount };
        });
    };

    const analyzeIntent = (category: string, totalDuration: number) => {
        // Threshold: 3000ms dwell time
        if (totalDuration > 3000) {
            if (category === "electronics" || category === "sound" || category === "appliances") {
                setIntent("luxury");
            } else if (category === "tools" || category === "home-care") {
                setIntent("utilitarian");
            }
        }
    };

    return (
        <UserIntentContext.Provider value={{ intent, registerInteraction }}>
            {children}
        </UserIntentContext.Provider>
    );
}

export const useUserIntent = () => useContext(UserIntentContext);
