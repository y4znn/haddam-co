"use client";

import { Button } from "@/components/ui/button";

export function Newsletter() {
    return (
        <section className="container mx-auto px-4 py-8 mb-20">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-logo-blue opacity-20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-logo-red opacity-20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                            Stay updated on new arrivals
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Join 10,000+ homeowners receiving our weekly guide to better home living and exclusive deals.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                        <input
                            className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[300px] backdrop-blur-sm transition-all"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Button size="lg" variant="secondary" magnetic className="rounded-full px-8 py-6 text-base font-bold shadow-xl">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
