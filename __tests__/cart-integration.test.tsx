import { render, screen, fireEvent, act } from '@testing-library/react';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/lib/data';

// Mock toast to avoid noisy output or errors
jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
    },
}));

// Mock localStorage for Zustand persistence
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

describe('Cart Integration', () => {
    beforeEach(() => {
        localStorageMock.clear();
        useCart.getState().clearCart();
        jest.clearAllMocks();
    });

    const mockProduct: Product = {
        id: 'test-1',
        name: 'Test Product',
        category: 'Electronics',
        price: 100,
        image: '/test.jpg',
        description: 'Test Description',
    };

    it('should add item to global cart state when Add to Cart button is clicked', () => {
        // 1. Render ProductCard
        render(<ProductCard product={mockProduct} />);

        // 2. Click "Add to Cart" button (it's inside an overlay, but fireEvent should find it)
        const addButton = screen.getByText(/Add to Cart/i);

        // Check initial state
        expect(useCart.getState().items).toHaveLength(0);

        // 3. Click
        fireEvent.click(addButton);

        // 4. Assert cart state updated
        expect(useCart.getState().items).toHaveLength(1);
        expect(useCart.getState().items[0].product.name).toBe('Test Product');
    });
});
