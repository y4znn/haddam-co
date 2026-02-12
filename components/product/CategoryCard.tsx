
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    name: string;
    slug: string;
    image: string;
    index?: number;
}

export function CategoryCard({ name, slug, image, index = 0 }: CategoryCardProps) {
    return (
        <Link href={`/category/${slug}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                    type: "spring", stiffness: 300, damping: 20
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel group relative overflow-hidden rounded-2xl shadow-lg hover:bg-white/10 hover:shadow-2xl transition-all duration-500 h-full"
            >
                <div className="aspect-[4/3] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <h3 className="text-2xl font-heading font-bold text-white tracking-tight drop-shadow-md">
                            {name}
                        </h3>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
