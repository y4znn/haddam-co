import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '@/types';
import { toast } from 'sonner';

interface CartStore {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.product.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                    toast.success("Updated quantity in cart");
                } else {
                    set({ items: [...currentItems, { product, quantity: 1 }] });
                    toast.success("Added to cart");
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.product.id !== id) });
                toast.info("Removed from cart");
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    const currentItems = get().items;
                    set({ items: currentItems.filter((item) => item.product.id !== id) });
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.product.id === id ? { ...item, quantity } : item
                    )
                });
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => {
                if (typeof window !== "undefined") return localStorage;
                return {
                    getItem: () => null,
                    setItem: () => { },
                    removeItem: () => { },
                };
            }),
        }
    )
);
