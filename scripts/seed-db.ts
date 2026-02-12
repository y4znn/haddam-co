
import * as fs from 'fs';
import * as path from 'path';

// INLINED MASTER INVENTORY (Reflecting the latest updates + Tools)
const fullInventory = [
    // --- WASHING MACHINES ---
    { name: "General Pro GP-SD909-W 9KG", category: "Appliances", sub: "Washing Machines", price: 450, image_prompt: "White General Pro washing machine front load studio" },
    { name: "General Pro GP-SD909-S 9KG", category: "Appliances", sub: "Washing Machines", price: 460, image_prompt: "Silver General Pro washing machine front load" },
    { name: "Samsung WW80TA046AE 8KG", category: "Appliances", sub: "Washing Machines", price: 550, image_prompt: "Samsung white washing machine front load ecobubble" },
    { name: "Samsung WW11BB944DGBGU 11.5KG", category: "Appliances", sub: "Washing Machines", price: 800, image_prompt: "Black Samsung washing machine AI control" },
    { name: "LG F4R5VYG6P 9KG", category: "Appliances", sub: "Washing Machines", price: 650, image_prompt: "Stainless steel LG washing machine AI DD" },
    { name: "Sharp ES-FE912DLZ 9KG", category: "Appliances", sub: "Washing Machines", price: 420, image_prompt: "Silver Sharp washing machine front load" },
    { name: "LG T19H3SDHT2 19KG", category: "Appliances", sub: "Washing Machines", price: 900, image_prompt: "Black LG top load washing machine massive capacity" },

    // --- DRYERS ---
    { name: "LG RH80TAP6RM 8KG Heat Pump", category: "Appliances", sub: "Dryers", price: 700, image_prompt: "White LG heat pump dryer dual inverter" },
    { name: "Samsung DV90T5240AX 9KG", category: "Appliances", sub: "Dryers", price: 750, image_prompt: "Inox Samsung dryer heat pump AI control" },

    // --- TV & AUDIO ---
    { name: "General Pro 5006 50\" 4K", category: "Electronics", sub: "TVs", price: 350, image_prompt: "50 inch smart TV displaying vibrant colors dark room" },
    { name: "Samsung 55Q60D QLED", category: "Electronics", sub: "TVs", price: 700, image_prompt: "Samsung QLED TV slim design blue background" },
    { name: "TCL 65P6K 65\" 4K", category: "Electronics", sub: "TVs", price: 550, image_prompt: "65 inch TCL smart TV ultra thin bezel" },
    { name: "Samsung HWQ800F Soundbar", category: "Electronics", sub: "Audio", price: 450, image_prompt: "Samsung soundbar with subwoofer home theater setup" },
    { name: "LG XBOOM ON7", category: "Electronics", sub: "Audio", price: 300, image_prompt: "LG XBOOM party speaker with LED lights" },

    // --- KITCHEN ---
    { name: "Philips Airfryer HD9252", category: "Kitchen", sub: "Air Fryers", price: 75, image_prompt: "Black Philips airfryer cooking french fries" },
    { name: "Tefal Easy Fry EY905870 XXL", category: "Kitchen", sub: "Air Fryers", price: 180, image_prompt: "Dual drawer Tefal air fryer stainless steel" },
    { name: "Kenwood MGP40 Meat Mincer", category: "Kitchen", sub: "Food Prep", price: 80, image_prompt: "Silver Kenwood meat grinder heavy duty" },
    { name: "Braun Multiquick 7 Hand Blender", category: "Kitchen", sub: "Blenders", price: 100, image_prompt: "Braun hand blender stainless steel shaft splashing soup" },
    { name: "Moulinex Food Processor FP821811", category: "Kitchen", sub: "Food Prep", price: 110, image_prompt: "Moulinex food processor with slicing discs" },
    { name: "Panasonic Water Dispenser WD3128", category: "Kitchen", sub: "Dispensers", price: 105, image_prompt: "Silver Panasonic water dispenser top load" },

    // --- FRIDGES ---
    { name: "LG GL-131SQQ 1 Door", category: "Appliances", sub: "Refrigerators", price: 200, image_prompt: "Small white single door LG refrigerator" },
    { name: "Samsung RR39 Twin Fridge", category: "Appliances", sub: "Refrigerators", price: 1200, image_prompt: "Tall stainless steel Samsung twin refrigerator and freezer pair" },
    { name: "Sharp SJ-GP75D-BK5 Glass Black", category: "Appliances", sub: "Refrigerators", price: 850, image_prompt: "Black glass finish Sharp refrigerator modern kitchen" },

    // --- BEAUTY ---
    { name: "Braun Silk-épil 3 SE3000", category: "Beauty", sub: "Hair Removal", price: 28, image_prompt: "Pink Braun silk-epil 3 device studio shot" },
    { name: "Braun Silk-épil 9 SE9041", category: "Beauty", sub: "Hair Removal", price: 120, image_prompt: "White and gold Braun silk-epil 9 wet and dry" },
    { name: "BaByliss 6709DE Hair Dryer", category: "Beauty", sub: "Hair Care", price: 39, image_prompt: "Black BaByliss pro hair dryer 2100W" },
    { name: "Philips Multigroom MG7940 15-in-1", category: "Beauty", sub: "Grooming", price: 70, image_prompt: "Metal Philips trimmer with many attachments arranged neatly" },

    // --- AC & VACUUM ---
    { name: "TCL 12000 BTU Inverter AC", category: "Heating & Cooling", sub: "ACs", price: 350, image_prompt: "White split air conditioner unit on wall" },
    { name: "Bissell PowerForce Helix Vacuum", category: "Home Care", sub: "Vacuums", price: 85, image_prompt: "Upright Bissell vacuum cleaner blue and black" },
    { name: "Hoover Carpet Cleaner CDCW-PDME", category: "Home Care", sub: "Vacuums", price: 150, image_prompt: "Hoover carpet washer cleaning rug" },

    // --- TOOLS ---
    { name: "Yale Fireproof Safe Large", category: "Tools", sub: "Security", price: 299, image_prompt: "Heavy-duty digital safe fireproof" },
    { name: "Satellite Receiver 4K Android", category: "Tools", sub: "Accessories", price: 65, image_prompt: "Android TV box satellite receiver 4k" }
];

// 1. Force Category Slugs
function getCategorySlug(category: string): string {
    const map: Record<string, string> = {
        "Heating & Cooling": "heating-cooling",
        "Home Care": "home-care",
        "Tools": "tools",
        "Kitchen": "kitchen",
        "Appliances": "appliances",
        "Electronics": "electronics",
        "Beauty": "beauty"
    };
    return map[category] || category.toLowerCase().replace(/\s+/g, '-');
}

// Helper to generate IDs
function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function getPlaceholderImage(category: string, sub: string): string {
    const map: Record<string, string> = {
        'Washing Machines': 'photo-1626806819282-2c1dc01a5e0c',
        'Dryers': 'photo-1626806775882-63b05f259074',
        'TVs': 'photo-1593784991095-a205069470b6',
        'Audio': 'photo-1545454675-3531b543be5d',
        'Air Fryers': 'photo-1725832794503-60586e902b37',
        'Food Prep': 'photo-1585587747805-4f7f6f578df9',
        'Blenders': 'photo-1570222094114-284385de727a',
        'Dispensers': 'photo-1616186414704-585a21db7c6c',
        'Refrigerators': 'photo-1571175443880-49e1d58b794a',
        'Hair Removal': 'photo-1596462502278-27bfdd403cc2',
        'Hair Care': 'photo-1522337360705-8b13d5204394',
        'Grooming': 'photo-1621607512214-68297f236581',
        'ACs': 'photo-1616423640778-28d1b53229bd',
        'Vacuums': 'photo-1585750033066-6b22b724f114',
    };

    // Fallback images
    const catMap: Record<string, string> = {
        'Electronics': 'photo-1550009158-9ebf69173e03',
        'Appliances': 'photo-1556911220-e15b29be8c8f',
        'Tools': 'photo-1581244277943-fe4a9c777189',
        'Beauty': 'photo-1596462502278-27bfdd403cc2',
        'Kitchen': 'photo-1556910103-1c02745a30bf',
        'Heating & Cooling': 'photo-1616423640779-28d1b53229bd',
        'Home Care': 'photo-1527513123471-294b0a48473d',
    }

    const id = map[sub] || catMap[category] || 'photo-1526738549149-8e07eca6c147';
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
}

// Generate the new file content
// We collect unique slugs for the Category type
const allSlugs = Array.from(new Set(fullInventory.map(i => getCategorySlug(i.category))));
const categoryUnion = allSlugs.map(c => `"${c}"`).join(' | ');

const seededProducts = fullInventory.map((item, index) => {
    return {
        id: slugify(item.name) + '-' + (index + 1),
        name: item.name,
        category: getCategorySlug(item.category), // Storing the SLUG as the category
        subcategory: item.sub,
        price: item.price,
        image: getPlaceholderImage(item.category, item.sub),
        description: `${item.name} - ${item.sub}. ${item.image_prompt}`,
        badge: item.price > 500 ? 'Premium' : undefined,
        image_prompt: item.image_prompt
    };
});

const fileContent = `
export type Category = ${categoryUnion};

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
}

export const products: Product[] = ${JSON.stringify(seededProducts, null, 4)};
`;

const outputPath = path.resolve(process.cwd(), 'lib/data.ts');
fs.writeFileSync(outputPath, fileContent);

console.log(`Database seeded successfully!`);
console.log(`Updated lib/data.ts with ${seededProducts.length} items using STRICT SLUGS.`);
