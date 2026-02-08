import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutPage from '@/app/checkout/page';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock useCart
const mockCart = {
    items: [
        {
            product: {
                id: '1',
                name: 'Product A',
                price: 100,
                image: '/img-a',
                category: 'Electronics',
                description: 'Desc',
            },
            quantity: 1,
        },
    ],
    clearCart: jest.fn(),
};

jest.mock('@/hooks/use-cart', () => ({
    useCart: () => mockCart,
}));

describe('CheckoutPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the checkout form', () => {
        render(<CheckoutPage />);
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    });

    it('should validate phone number format', () => {
        render(<CheckoutPage />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Beirut' } });
        fireEvent.change(screen.getByLabelText(/Detailed Address/i), { target: { value: 'Street' } });

        // Invalid phone
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456' } });

        // Submit
        const submitBtn = screen.getByRole('button', { name: /Place Order/i });
        fireEvent.click(submitBtn);

        expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Invalid phone number'));
    });

    it('should submit valid order', () => {
        render(<CheckoutPage />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Beirut' } });
        fireEvent.change(screen.getByLabelText(/Detailed Address/i), { target: { value: 'Street' } });

        // Valid phone
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '+961 70 123456' } });

        // Submit
        const submitBtn = screen.getByRole('button', { name: /Place Order/i });
        fireEvent.click(submitBtn);

        expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Order placed'));
    });
});
