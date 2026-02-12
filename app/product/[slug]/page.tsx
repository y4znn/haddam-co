import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const slug = (await params).slug;
    const product = products.find((p) => p.id === slug);

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | Distant Hypernova`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const slug = (await params).slug;
    const product = products.find((p) => p.id === slug);

    if (!product) {
        return notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Hypernova"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <ProductDetailView product={product} />
        </>
    );
}
