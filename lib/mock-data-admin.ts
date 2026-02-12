import { Order } from "@/types";

export const adminOrders: Order[] = [
    {
        id: "ORD-9921",
        customer: { name: "Karim T.", phone: "+961 70 882211", city: "Achrafieh", address: "Sassine Square" },
        items: [{ productId: "samsung-55q60d-qled-11", quantity: 1, price: 700 }],
        total: 700,
        payment_status: "pending_cash",
        fulfillment_status: "out_for_delivery",
        driver_assigned: "Hassan (Delta-1)",
        timestamp: "2026-02-12T14:30:00Z"
    },
    {
        id: "ORD-9922",
        customer: { name: "Nadia S.", phone: "+961 03 112233", city: "Verdun", address: "Dunes Center, Fl 4" },
        items: [{ productId: "lg-xboom-on7-14", quantity: 1, price: 300 }],
        total: 300,
        payment_status: "paid",
        fulfillment_status: "delivered",
        driver_assigned: "Fadi (Delta-3)",
        timestamp: "2026-02-12T13:15:00Z"
    },
    {
        id: "ORD-9923",
        customer: { name: "Rawad K.", phone: "+961 71 998877", city: "Hazmieh", address: "Mar Takla" },
        items: [{ productId: "philips-airfryer-hd9252-15", quantity: 2, price: 150 }],
        total: 150,
        payment_status: "pending_cash",
        fulfillment_status: "processing",
        timestamp: "2026-02-12T15:00:00Z"
    },
    {
        id: "ORD-9924",
        customer: { name: "Lara M.", phone: "+961 76 445566", city: "Jal El Dib", address: "Main Road" },
        items: [{ productId: "dysan-v15", quantity: 1, price: 650 }], // Mock product ID
        total: 650,
        payment_status: "pending_cash",
        fulfillment_status: "processing",
        timestamp: "2026-02-12T15:45:00Z"
    },
    {
        id: "ORD-9925",
        customer: { name: "Tarek B.", phone: "+961 03 556677", city: "Hamra", address: "Bliss St" },
        items: [{ productId: "sony-xm5", quantity: 1, price: 350 }], // Mock ID
        total: 350,
        payment_status: "paid",
        fulfillment_status: "delivered",
        driver_assigned: "Hassan (Delta-1)",
        timestamp: "2026-02-12T12:00:00Z"
    },
    {
        id: "ORD-9926",
        customer: { name: "Samira R.", phone: "+961 70 001122", city: "Broumana", address: "Printania Area" },
        items: [{ productId: "lg-oled-c2", quantity: 1, price: 1200 }], // Mock ID
        total: 1200,
        payment_status: "pending_cash", // High Risk
        fulfillment_status: "out_for_delivery",
        driver_assigned: "Charbel (Delta-2)",
        timestamp: "2026-02-12T11:00:00Z"
    }
];

export const drivers = [
    { id: "d1", name: "Hassan (Delta-1)", cash_balance: 1050, status: "active" },
    { id: "d2", name: "Charbel (Delta-2)", cash_balance: 1200, status: "warning" },
    { id: "d3", name: "Fadi (Delta-3)", cash_balance: 0, status: "idle" },
];
