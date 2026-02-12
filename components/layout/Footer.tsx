"use client";

import { Facebook, Instagram, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    // Secure Enclave: Hide Footer on Checkout
    if (pathname === "/checkout") return null;

    return (
        <footer className="bg-background border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center space-x-2 font-heading font-bold text-2xl tracking-tighter">
                            <span>Haddam</span>
                            <span className="text-primary">.co</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm">
                            Your trusted partner for high-quality home appliances. We bring innovation and style to every corner of your house.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Mail].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-logo-blue hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">Shop</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            {['Electronics', 'Appliances', 'Kitchen', 'Beauty'].map((item) => (
                                <li key={item}>
                                    <Link href={`/category/${item.toLowerCase()}`} className="hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">Support</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            {['Track Order', 'Returns & Refunds', 'Service Booking', 'Manuals'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">Company</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            {['About Us', 'Showrooms', 'Contact', 'Careers'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Haddam.co. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
