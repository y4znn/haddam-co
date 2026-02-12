"use client";

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterHUD } from "@/components/ui/FilterHUD";
import { useProductFilter } from "@/hooks/useProductFilter";

export function ProductsContent() {
    const {
        filters,
        filteredProducts,
        setSearch,
        setCategory,
        setBrand,
        setPriceRange,
        toggleStock,
        setSort,
        resetFilters
    } = useProductFilter(products);

    return (
        <div className="min-h-screen pb-24 relative">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-[-1]" />

            <div className="container mx-auto px-4 pt-8 lg:pt-12 relative z-10">
                {/* Header */}
                <div className="mb-12 text-center space-y-4">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight text-white drop-shadow-xl">
                        Quantum Inventory
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-lg mx-auto text-lg">
                        Select parameters to filter the global supply chain.
                    </p>
                </div>

                {/* Filter Control Deck */}
                <FilterHUD
                    filters={filters}
                    setSearch={setSearch}
                    setCategory={setCategory}
                    setBrand={setBrand}
                    setPriceRange={setPriceRange}
                    toggleStock={toggleStock}
                    setSort={setSort}
                    resetFilters={resetFilters}
                />

                {/* Liquid Grid */}
                <ProductGrid products={filteredProducts} />
            </div>
        </div>
    );
}
