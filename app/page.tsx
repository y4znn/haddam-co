import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/20 py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            Now Delivering to All Lebanon
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-3xl font-heading">
            Premium Electronics. <br className="hidden sm:inline" />
            <span className="text-primary">Industrial Grade.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            The anti-basic store for those who know quality. Routers, UPS, Appliances, and Tools. Cash on Delivery supported.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Catalog
            </Button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Product Grid */}
      <section id="catalog" className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-heading">Featured Collection</h2>
          <Button variant="link" className="text-primary">View all</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
