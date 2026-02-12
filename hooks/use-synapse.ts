import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FilterPreferences {
    priceRange: [number, number];
    stockOnly: boolean;
    sort: string;
}

interface SynapseStore {
    // Vibe Tracking
    viewHistory: string[]; // Last 5 Product IDs
    lastViewedCategory: string | null;

    // Command HUD Persistence
    filterPreferences: FilterPreferences;

    // Actions
    addToHistory: (productId: string) => void;
    setLastViewedCategory: (category: string) => void;
    setFilterPreferences: (prefs: Partial<FilterPreferences>) => void;
}

export const useSynapse = create<SynapseStore>()(
    persist(
        (set, get) => ({
            viewHistory: [],
            lastViewedCategory: null,
            filterPreferences: {
                priceRange: [0, 5000],
                stockOnly: false,
                sort: 'featured',
            },

            addToHistory: (productId) => {
                const currentHistory = get().viewHistory;
                // Keep only unique, recent 5
                const newHistory = [productId, ...currentHistory.filter(id => id !== productId)].slice(0, 5);
                set({ viewHistory: newHistory });
            },

            setLastViewedCategory: (category) => set({ lastViewedCategory: category }),

            setFilterPreferences: (prefs) =>
                set((state) => ({
                    filterPreferences: { ...state.filterPreferences, ...prefs }
                })),
        }),
        {
            name: 'synapse-core', // Key in localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);
