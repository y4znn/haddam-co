export type Category = "appliances" | "electronics" | "kitchen" | "beauty" | "heating-cooling" | "home-care" | "tools" | "sound";

export interface Product {
    id: string;
    name: string;
    category: Category;
    subcategory?: string;
    price: number;
    image: string;
    description: string;
    badge?: string;
    tags?: string[];
    image_prompt?: string;
    brand?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type PaymentStatus = 'pending_cash' | 'paid' | 'pending_verification';
export type FulfillmentStatus = 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
    id: string;
    customer: {
        name: string;
        phone: string;
        city: string;
        address: string;
    };
    items: {
        productId: string;
        quantity: number;
        price: number; // Snapshot of price at purchase
    }[];
    total: number;
    payment_status: PaymentStatus;
    fulfillment_status: FulfillmentStatus;
    driver_assigned?: string;
    timestamp: string;
}
