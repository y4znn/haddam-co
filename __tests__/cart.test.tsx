import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks/use-cart';

// Mock toast
jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
    },
}));

// Mock localStorage
const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('useCart', () => {
    beforeEach(() => {
        localStorageMock.clear();
        useCart.getState().clearCart();
        jest.clearAllMocks();
    });

    const productA = {
        id: '1',
        name: 'Product A',
        category: 'Electronics' as const,
        price: 100,
        image: 'img-a',
        description: 'Desc A',
    };

    const productB = {
        id: '2',
        name: 'Product B',
        category: 'Appliances' as const,
        price: 200,
        image: 'img-b',
        description: 'Desc B',
    };

    it('should start with an empty cart', () => {
        const { result } = renderHook(() => useCart());
        expect(result.current.items).toEqual([]);
    });

    it('should add an item to the cart', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addItem(productA);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]).toEqual({ product: productA, quantity: 1 });
    });

    it('should increase quantity if item already exists', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addItem(productA);
        });

        act(() => {
            result.current.addItem(productA);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(2);
    });

    it('should remove an item from the cart', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addItem(productA);
            result.current.removeItem(productA.id);
        });

        expect(result.current.items).toHaveLength(0);
    });

    it('should update item quantity', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addItem(productA);
            result.current.updateQuantity(productA.id, 5);
        });

        expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is updated to 0', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addItem(productA);
            result.current.updateQuantity(productA.id, 0);
        });

        expect(result.current.items).toHaveLength(0);
    });
});
