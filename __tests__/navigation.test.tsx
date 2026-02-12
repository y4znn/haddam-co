import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import '@testing-library/jest-dom';

// 1. Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => '/',
}));

// 2. Mock next/link because it uses Next.js routing internals
//    Note: We simply render an anchor tag to verify the href attribute. 
//          Integration tests of actual navigation need E2E or more complex setup.
//          Verifying the href is correct is usually sufficient for unit/integration here.

describe('Navigation Routing', () => {
    it('should have correct href for Tools category', () => {
        render(<Header />);
        const toolsLink = screen.getByRole('link', { name: /Tools/i });
        expect(toolsLink).toHaveAttribute('href', '/category/tools');
    });

    it('should have correct href for Beauty category', () => {
        render(<Header />);
        const beautyLink = screen.getByRole('link', { name: /Beauty/i });
        expect(beautyLink).toHaveAttribute('href', '/category/beauty');
    });
});
