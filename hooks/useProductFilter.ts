import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';

export interface FilterState {
    searchQuery: string;
    category: string | null;
    brand: string | null;
    priceRange: [number, number];
    inStockOnly: boolean;
    sort: 'relevance' | 'price-asc' | 'price-desc';
}

const INITIAL_FILTERS: FilterState = {
    searchQuery: '',
    category: null,
    brand: null,
    priceRange: [0, 2000],
    inStockOnly: false,
    sort: 'relevance',
};

export function useProductFilter(products: Product[]) {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

    // Initialize from URL params
    useEffect(() => {
        const brandParam = searchParams.get('brand');
        const categoryParam = searchParams.get('category');

        if (brandParam || categoryParam) {
            setFilters(prev => ({
                ...prev,
                brand: brandParam || null,
                category: categoryParam || null
            }));
        }
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // 1. Search Logic (Name, Brand, Category, Description)
            if (filters.searchQuery) {
                const q = filters.searchQuery.toLowerCase().trim();
                const match =
                    product.name.toLowerCase().includes(q) ||
                    product.brand?.toLowerCase().includes(q) ||
                    product.category.toLowerCase().includes(q) ||
                    product.description.toLowerCase().includes(q);

                if (!match) return false;
            }

            // 2. Category Logic
            if (filters.category && product.category !== filters.category) {
                return false;
            }

            // 3. Brand Logic (Strict Normalized)
            if (filters.brand) {
                const productBrand = product.brand?.toLowerCase().trim();
                const filterBrand = filters.brand.toLowerCase().trim();
                if (productBrand !== filterBrand) {
                    return false;
                }
            }

            // 4. Price Logic
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
                return false;
            }

            // 5. Stock Logic
            if (filters.inStockOnly) {
                return true;
            }

            return true;
        }).sort((a, b) => {
            switch (filters.sort) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                default: return 0; // Relevance
            }
        });
    }, [products, filters]);

    // Actions
    const setSearch = (q: string) => setFilters(prev => ({ ...prev, searchQuery: q }));
    const setCategory = (c: string | null) => setFilters(prev => ({ ...prev, category: c, brand: null })); // Reset brand when changing category? Maybe.
    const setBrand = (b: string | null) => setFilters(prev => ({ ...prev, brand: b }));
    const setPriceRange = (range: [number, number]) => setFilters(prev => ({ ...prev, priceRange: range }));
    const toggleStock = () => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }));
    const setSort = (sort: FilterState['sort']) => setFilters(prev => ({ ...prev, sort }));
    const resetFilters = () => setFilters(INITIAL_FILTERS);

    return {
        filters,
        filteredProducts,
        setSearch,
        setCategory,
        setBrand,
        setPriceRange,
        toggleStock,
        setSort,
        resetFilters
    };
}
