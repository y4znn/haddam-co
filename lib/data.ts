export type Category = "Electronics" | "Appliances" | "Tools";

export interface Product {
    id: string;
    name: string;
    category: Category;
    price: number; // in USD
    image: string;
    description: string;
    badge?: string;
}

export const products: Product[] = [
    // Electronics
    {
        id: "e1",
        name: "Cisco Industrial Router X5",
        category: "Electronics",
        price: 350,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?auto=format&fit=crop&w=800&q=80",
        description: "High-performance dual-band router for seamless connectivity in concrete Lebanese homes.",
        badge: "Best Seller"
    },
    {
        id: "e2",
        name: "APC UPS Back-UPS 1200VA",
        category: "Electronics",
        price: 180,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        description: "Keep your internet running during power cuts. 1200VA capacity with surge protection.",
    },
    {
        id: "e3",
        name: "Lithium LiFePO4 Battery 200Ah",
        category: "Electronics",
        price: 450,
        image: "https://images.unsplash.com/photo-1619642751034-7c3933c19e5e?auto=format&fit=crop&w=800&q=80", // solar panel/battery vibe
        description: "Deep cycle lithium battery for solar systems. 10-year lifespan guaranteed.",
        badge: "Eco-Friendly"
    },

    // Appliances
    {
        id: "a1",
        name: "Samsung Front Load Washer 9kg",
        category: "Appliances",
        price: 550,
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        description: "Energy efficient washing machine with steam cycle and inverter motor.",
    },
    {
        id: "a2",
        name: "LG Inverter Freezer 300L",
        category: "Appliances",
        price: 620,
        image: "https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&w=800&q=80",
        description: "Vertical freezer with No Frost technology. Perfect for long-term storage.",
    },
    {
        id: "a3",
        name: "Sharp Digital Microwave 34L",
        category: "Appliances",
        price: 140,
        image: "https://images.unsplash.com/photo-1585659722983-3a675bad4278?auto=format&fit=crop&w=800&q=80",
        description: "Stainless steel microwave with grill function and auto-cook menus.",
    },

    // Tools
    {
        id: "t1",
        name: "Yale Fireproof Safe Large",
        category: "Tools",
        price: 299,
        image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?auto=format&fit=crop&w=800&q=80",
        description: "Heavy-duty digital safe. Fireproof for 1 hour. Secure your valuables.",
        badge: "Heavy Duty"
    },
    {
        id: "t2",
        name: "Satellite Receiver 4K Android",
        category: "Tools",
        price: 65,
        image: "https://images.unsplash.com/photo-1593305841991-05c2e449e08e?auto=format&fit=crop&w=800&q=80",
        description: "Android TV box with satellite tuner. Support for IPTV and 4K streaming.",
    }
];
