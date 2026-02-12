"use client";

import { Suspense } from "react";
import { ProductsContent } from "@/components/product/ProductsContent";

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ProductsContent />
        </Suspense>
    );
}
