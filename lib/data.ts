import { Category, Product, Order, PaymentStatus, FulfillmentStatus } from "@/types";

export const products: Product[] = [
    {
        "id": "general-pro-gp-sd909-w-9kg-1",
        "name": "General Pro GP-SD909-W 9KG",
        "brand": "General Pro",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 450,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "General Pro GP-SD909-W 9KG - Washing Machines. White General Pro washing machine front load studio",
        "image_prompt": "White General Pro washing machine front load studio"
    },
    {
        "id": "general-pro-gp-sd909-s-9kg-2",
        "name": "General Pro GP-SD909-S 9KG",
        "brand": "General Pro",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 460,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "General Pro GP-SD909-S 9KG - Washing Machines. Silver General Pro washing machine front load",
        "image_prompt": "Silver General Pro washing machine front load"
    },
    {
        "id": "samsung-ww80ta046ae-8kg-3",
        "name": "Samsung WW80TA046AE 8KG",
        "brand": "Samsung",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 550,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "Samsung WW80TA046AE 8KG - Washing Machines. Samsung white washing machine front load ecobubble",
        "badge": "Premium",
        "image_prompt": "Samsung white washing machine front load ecobubble"
    },
    {
        "id": "samsung-ww11bb944dgbgu-115kg-4",
        "name": "Samsung WW11BB944DGBGU 11.5KG",
        "brand": "Samsung",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 800,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "Samsung WW11BB944DGBGU 11.5KG - Washing Machines. Black Samsung washing machine AI control",
        "badge": "Premium",
        "image_prompt": "Black Samsung washing machine AI control"
    },
    {
        "id": "lg-f4r5vyg6p-9kg-5",
        "name": "LG F4R5VYG6P 9KG",
        "brand": "LG",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 650,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "LG F4R5VYG6P 9KG - Washing Machines. Stainless steel LG washing machine AI DD",
        "badge": "Premium",
        "image_prompt": "Stainless steel LG washing machine AI DD"
    },
    {
        "id": "sharp-es-fe912dlz-9kg-6",
        "name": "Sharp ES-FE912DLZ 9KG",
        "brand": "Sharp",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 420,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "Sharp ES-FE912DLZ 9KG - Washing Machines. Silver Sharp washing machine front load",
        "image_prompt": "Silver Sharp washing machine front load"
    },
    {
        "id": "lg-t19h3sdht2-19kg-7",
        "name": "LG T19H3SDHT2 19KG",
        "brand": "LG",
        "category": "appliances",
        "subcategory": "Washing Machines",
        "price": 900,
        "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80",
        "description": "LG T19H3SDHT2 19KG - Washing Machines. Black LG top load washing machine massive capacity",
        "badge": "Premium",
        "image_prompt": "Black LG top load washing machine massive capacity"
    },
    {
        "id": "lg-rh80tap6rm-8kg-heat-pump-8",
        "name": "LG RH80TAP6RM 8KG Heat Pump",
        "brand": "LG",
        "category": "appliances",
        "subcategory": "Dryers",
        "price": 700,
        "image": "https://images.unsplash.com/photo-1626806775882-63b05f259074?auto=format&fit=crop&w=800&q=80",
        "description": "LG RH80TAP6RM 8KG Heat Pump - Dryers. White LG heat pump dryer dual inverter",
        "badge": "Premium",
        "image_prompt": "White LG heat pump dryer dual inverter"
    },
    {
        "id": "samsung-dv90t5240ax-9kg-9",
        "name": "Samsung DV90T5240AX 9KG",
        "brand": "Samsung",
        "category": "appliances",
        "subcategory": "Dryers",
        "price": 750,
        "image": "https://images.unsplash.com/photo-1626806775882-63b05f259074?auto=format&fit=crop&w=800&q=80",
        "description": "Samsung DV90T5240AX 9KG - Dryers. Inox Samsung dryer heat pump AI control",
        "badge": "Premium",
        "image_prompt": "Inox Samsung dryer heat pump AI control"
    },
    {
        "id": "general-pro-5006-50-4k-10",
        "name": "General Pro 5006 50\" 4K",
        "brand": "General Pro",
        "category": "electronics",
        "subcategory": "TVs",
        "price": 350,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
        "description": "General Pro 5006 50\" 4K - TVs. 50 inch smart TV displaying vibrant colors dark room",
        "image_prompt": "50 inch smart TV displaying vibrant colors dark room"
    },
    {
        "id": "samsung-55q60d-qled-11",
        "name": "Samsung 55Q60D QLED",
        "brand": "Samsung",
        "category": "electronics",
        "subcategory": "TVs",
        "price": 700,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
        "description": "Samsung 55Q60D QLED - TVs. Samsung QLED TV slim design blue background",
        "badge": "Premium",
        "image_prompt": "Samsung QLED TV slim design blue background"
    },
    {
        "id": "tcl-65p6k-65-4k-12",
        "name": "TCL 65P6K 65\" 4K",
        "brand": "TCL",
        "category": "electronics",
        "subcategory": "TVs",
        "price": 550,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
        "description": "TCL 65P6K 65\" 4K - TVs. 65 inch TCL smart TV ultra thin bezel",
        "badge": "Premium",
        "image_prompt": "65 inch TCL smart TV ultra thin bezel"
    },
    {
        "id": "samsung-hwq800f-soundbar-13",
        "name": "Samsung HWQ800F Soundbar",
        "brand": "Samsung",
        "category": "sound",
        "subcategory": "Audio",
        "price": 450,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
        "description": "Samsung HWQ800F Soundbar - Audio. Samsung soundbar with subwoofer home theater setup",
        "image_prompt": "Samsung soundbar with subwoofer home theater setup"
    },
    {
        "id": "lg-xboom-on7-14",
        "name": "LG XBOOM ON7",
        "brand": "LG",
        "category": "sound",
        "subcategory": "Audio",
        "price": 300,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
        "description": "LG XBOOM ON7 - Audio. LG XBOOM party speaker with LED lights",
        "image_prompt": "LG XBOOM party speaker with LED lights"
    },
    {
        "id": "philips-airfryer-hd9252-15",
        "name": "Philips Airfryer HD9252",
        "brand": "Philips",
        "category": "kitchen",
        "subcategory": "Air Fryers",
        "price": 75,
        "image": "https://images.unsplash.com/photo-1725832794503-60586e902b37?auto=format&fit=crop&w=800&q=80",
        "description": "Philips Airfryer HD9252 - Air Fryers. Black Philips airfryer cooking french fries",
        "image_prompt": "Black Philips airfryer cooking french fries"
    },
    {
        "id": "tefal-easy-fry-ey905870-xxl-16",
        "name": "Tefal Easy Fry EY905870 XXL",
        "brand": "Tefal",
        "category": "kitchen",
        "subcategory": "Air Fryers",
        "price": 180,
        "image": "https://images.unsplash.com/photo-1725832794503-60586e902b37?auto=format&fit=crop&w=800&q=80",
        "description": "Tefal Easy Fry EY905870 XXL - Air Fryers. Dual drawer Tefal air fryer stainless steel",
        "image_prompt": "Dual drawer Tefal air fryer stainless steel"
    },
    {
        "id": "kenwood-mgp40-meat-mincer-17",
        "name": "Kenwood MGP40 Meat Mincer",
        "brand": "Kenwood",
        "category": "kitchen",
        "subcategory": "Food Prep",
        "price": 80,
        "image": "https://images.unsplash.com/photo-1585587747805-4f7f6f578df9?auto=format&fit=crop&w=800&q=80",
        "description": "Kenwood MGP40 Meat Mincer - Food Prep. Silver Kenwood meat grinder heavy duty",
        "image_prompt": "Silver Kenwood meat grinder heavy duty"
    },
    {
        "id": "braun-multiquick-7-hand-blender-18",
        "name": "Braun Multiquick 7 Hand Blender",
        "brand": "Braun",
        "category": "kitchen",
        "subcategory": "Blenders",
        "price": 100,
        "image": "https://images.unsplash.com/photo-1570222094114-284385de727a?auto=format&fit=crop&w=800&q=80",
        "description": "Braun Multiquick 7 Hand Blender - Blenders. Braun hand blender stainless steel shaft splashing soup",
        "image_prompt": "Braun hand blender stainless steel shaft splashing soup"
    },
    {
        "id": "moulinex-food-processor-fp821811-19",
        "name": "Moulinex Food Processor FP821811",
        "brand": "Moulinex",
        "category": "kitchen",
        "subcategory": "Food Prep",
        "price": 110,
        "image": "https://images.unsplash.com/photo-1585587747805-4f7f6f578df9?auto=format&fit=crop&w=800&q=80",
        "description": "Moulinex Food Processor FP821811 - Food Prep. Moulinex food processor with slicing discs",
        "image_prompt": "Moulinex food processor with slicing discs"
    },
    {
        "id": "panasonic-water-dispenser-wd3128-20",
        "name": "Panasonic Water Dispenser WD3128",
        "brand": "Panasonic",
        "category": "kitchen",
        "subcategory": "Dispensers",
        "price": 105,
        "image": "https://images.unsplash.com/photo-1616186414704-585a21db7c6c?auto=format&fit=crop&w=800&q=80",
        "description": "Panasonic Water Dispenser WD3128 - Dispensers. Silver Panasonic water dispenser top load",
        "image_prompt": "Silver Panasonic water dispenser top load"
    },
    {
        "id": "lg-gl-131sqq-1-door-21",
        "name": "LG GL-131SQQ 1 Door",
        "brand": "LG",
        "category": "appliances",
        "subcategory": "Refrigerators",
        "price": 200,
        "image": "https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&w=800&q=80",
        "description": "LG GL-131SQQ 1 Door - Refrigerators. Small white single door LG refrigerator",
        "image_prompt": "Small white single door LG refrigerator"
    },
    {
        "id": "samsung-rr39-twin-fridge-22",
        "name": "Samsung RR39 Twin Fridge",
        "brand": "Samsung",
        "category": "appliances",
        "subcategory": "Refrigerators",
        "price": 1200,
        "image": "https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&w=800&q=80",
        "description": "Samsung RR39 Twin Fridge - Refrigerators. Tall stainless steel Samsung twin refrigerator and freezer pair",
        "badge": "Premium",
        "image_prompt": "Tall stainless steel Samsung twin refrigerator and freezer pair"
    },
    {
        "id": "sharp-sj-gp75d-bk5-glass-black-23",
        "name": "Sharp SJ-GP75D-BK5 Glass Black",
        "brand": "Sharp",
        "category": "appliances",
        "subcategory": "Refrigerators",
        "price": 850,
        "image": "https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&w=800&q=80",
        "description": "Sharp SJ-GP75D-BK5 Glass Black - Refrigerators. Black glass finish Sharp refrigerator modern kitchen",
        "badge": "Premium",
        "image_prompt": "Black glass finish Sharp refrigerator modern kitchen"
    },
    {
        "id": "braun-silk-pil-3-se3000-24",
        "name": "Braun Silk-épil 3 SE3000",
        "brand": "Braun",
        "category": "beauty",
        "subcategory": "Hair Removal",
        "price": 28,
        "image": "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=800&q=80",
        "description": "Braun Silk-épil 3 SE3000 - Hair Removal. Pink Braun silk-epil 3 device studio shot",
        "image_prompt": "Pink Braun silk-epil 3 device studio shot"
    },
    {
        "id": "braun-silk-pil-9-se9041-25",
        "name": "Braun Silk-épil 9 SE9041",
        "brand": "Braun",
        "category": "beauty",
        "subcategory": "Hair Removal",
        "price": 120,
        "image": "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=800&q=80",
        "description": "Braun Silk-épil 9 SE9041 - Hair Removal. White and gold Braun silk-epil 9 wet and dry",
        "image_prompt": "White and gold Braun silk-epil 9 wet and dry"
    },
    {
        "id": "babyliss-6709de-hair-dryer-26",
        "name": "BaByliss 6709DE Hair Dryer",
        "brand": "BaByliss",
        "category": "beauty",
        "subcategory": "Hair Care",
        "price": 39,
        "image": "https://images.unsplash.com/photo-1522337360705-8b13d5204394?auto=format&fit=crop&w=800&q=80",
        "description": "BaByliss 6709DE Hair Dryer - Hair Care. Black BaByliss pro hair dryer 2100W",
        "image_prompt": "Black BaByliss pro hair dryer 2100W"
    },
    {
        "id": "philips-multigroom-mg7940-15-in-1-27",
        "name": "Philips Multigroom MG7940 15-in-1",
        "brand": "Philips",
        "category": "beauty",
        "subcategory": "Grooming",
        "price": 70,
        "image": "https://images.unsplash.com/photo-1621607512214-68297f236581?auto=format&fit=crop&w=800&q=80",
        "description": "Philips Multigroom MG7940 15-in-1 - Grooming. Metal Philips trimmer with many attachments arranged neatly",
        "image_prompt": "Metal Philips trimmer with many attachments arranged neatly"
    },
    {
        "id": "tcl-12000-btu-inverter-ac-28",
        "name": "TCL 12000 BTU Inverter AC",
        "brand": "TCL",
        "category": "heating-cooling",
        "subcategory": "ACs",
        "price": 350,
        "image": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=800&q=80",
        "description": "TCL 12000 BTU Inverter AC - ACs. White split air conditioner unit on wall",
        "image_prompt": "White split air conditioner unit on wall"
    },
    {
        "id": "bissell-powerforce-helix-vacuum-29",
        "name": "Bissell PowerForce Helix Vacuum",
        "brand": "Bissell",
        "category": "home-care",
        "subcategory": "Vacuums",
        "price": 85,
        "image": "https://images.unsplash.com/photo-1585750033066-6b22b724f114?auto=format&fit=crop&w=800&q=80",
        "description": "Bissell PowerForce Helix Vacuum - Vacuums. Upright Bissell vacuum cleaner blue and black",
        "image_prompt": "Upright Bissell vacuum cleaner blue and black"
    },
    {
        "id": "hoover-carpet-cleaner-cdcw-pdme-30",
        "name": "Hoover Carpet Cleaner CDCW-PDME",
        "brand": "Hoover",
        "category": "home-care",
        "subcategory": "Vacuums",
        "price": 150,
        "image": "https://images.unsplash.com/photo-1585750033066-6b22b724f114?auto=format&fit=crop&w=800&q=80",
        "description": "Hoover Carpet Cleaner CDCW-PDME - Vacuums. Hoover carpet washer cleaning rug",
        "image_prompt": "Hoover carpet washer cleaning rug"
    },
    {
        "id": "yale-fireproof-safe-large-31",
        "name": "Yale Fireproof Safe Large",
        "brand": "Yale",
        "category": "tools",
        "subcategory": "Security",
        "price": 299,
        "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
        "description": "Yale Fireproof Safe Large - Security. Heavy-duty digital safe fireproof",
        "image_prompt": "Heavy-duty digital safe fireproof"
    },
    {
        "id": "satellite-receiver-4k-android-32",
        "name": "Satellite Receiver 4K Android",
        "brand": "Generic",
        "category": "tools",
        "subcategory": "Accessories",
        "price": 65,
        "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
        "description": "Satellite Receiver 4K Android - Accessories. Android TV box satellite receiver 4k",
        "image_prompt": "Android TV box satellite receiver 4k"
    }
];

export const mockOrders: Order[] = [
    {
        id: "CORD-9092",
        customer: { name: "Hassan Fadlallah", phone: "+961 70 123456", city: "Beirut", address: "Hamra, Main St, Bldg 4" },
        items: [{ productId: "samsung-55q60d-qled-11", quantity: 1, price: 700 }],
        total: 700,
        payment_status: "pending_cash",
        fulfillment_status: "out_for_delivery",
        driver_assigned: "Ali K.",
        timestamp: "2026-02-12T10:30:00Z"
    },
    {
        id: "CORD-9093",
        customer: { name: "Sarah K.", phone: "+961 03 999888", city: "Jounieh", address: "Highway, Exit 4" },
        items: [{ productId: "philips-airfryer-hd9252-15", quantity: 2, price: 75 }],
        total: 150,
        payment_status: "paid",
        fulfillment_status: "delivered",
        driver_assigned: "Charbel T.",
        timestamp: "2026-02-11T14:20:00Z"
    },
    {
        id: "CORD-9094",
        customer: { name: "Rami H.", phone: "+961 71 555444", city: "Saida", address: "Corniche" },
        items: [{ productId: "lg-gl-131sqq-1-door-21", quantity: 1, price: 200 }],
        total: 200,
        payment_status: "pending_cash",
        fulfillment_status: "processing",
        timestamp: "2026-02-12T12:00:00Z"
    },
    {
        id: "CORD-9095", // High Value
        customer: { name: "VIP Lounge", phone: "+961 76 111222", city: "Verdun", address: "Dunes Center" },
        items: [{ productId: "samsung-rr39-twin-fridge-22", quantity: 2, price: 1200 }],
        total: 2400,
        payment_status: "pending_cash",
        fulfillment_status: "processing",
        timestamp: "2026-02-12T12:15:00Z"
    }
];
