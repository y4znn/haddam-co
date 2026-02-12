import { products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { notFound } from "next/navigation";

// Next.js 15+ App Router Page Props
interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for export
export async function generateStaticParams() {
    const categories = Array.from(new Set(products.map((p) => p.category.toLowerCase())));
    return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage(props: CategoryPageProps) {
    const params = await props.params;
    const { slug } = params;

    // Case-insensitive filtering
    const categoryProducts = products.filter(
        (p) => p.category.toLowerCase() === slug.toLowerCase()
    );

    if (categoryProducts.length === 0) {
        notFound();
    }

    // Capitalize for display (e.g., 'electronics' -> 'Electronics')
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="container mx-auto py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 shrink-0 space-y-6">
                    <div className="glass-card p-6 rounded-xl space-y-4 animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
                        <h3 className="font-heading font-semibold text-lg">Filters</h3>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Price Range</label>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full w-1/2 bg-primary" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>$0</span>
                                    <span>$1000+</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/10 space-y-2">
                                <label className="text-sm font-medium">Availability</label>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 rounded border border-primary bg-primary flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-sm" />
                                    </div>
                                    <span>In Stock</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="w-4 h-4 rounded border border-muted-foreground/50" />
                                    <span>Pre-order</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex flex-col gap-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h1 className="text-3xl font-bold font-heading">{categoryName} Collection</h1>
                        <p className="text-muted-foreground">
                            Browse our premium selection of {categoryName.toLowerCase()}.
                        </p>
                    </div>

                    <ProductGrid products={categoryProducts} />
                </div>
            </div>
        </div>
    );
}
