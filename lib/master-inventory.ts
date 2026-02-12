
export const fullInventory = [
    // --- WASHING MACHINES (Source: WASHING MACHINE.pdf) ---
    { name: "General Pro GP-SD909-W 9KG", brand: "General Pro", category: "Appliances", sub: "Washing Machines", price: 450, image_prompt: "White General Pro washing machine front load studio" },
    { name: "General Pro GP-SD909-S 9KG", brand: "General Pro", category: "Appliances", sub: "Washing Machines", price: 460, image_prompt: "Silver General Pro washing machine front load" },
    { name: "Samsung WW80TA046AE 8KG", brand: "Samsung", category: "Appliances", sub: "Washing Machines", price: 550, image_prompt: "Samsung white washing machine front load ecobubble" },
    { name: "Samsung WW11BB944DGBGU 11.5KG", brand: "Samsung", category: "Appliances", sub: "Washing Machines", price: 800, image_prompt: "Black Samsung washing machine AI control" },
    { name: "LG F4R5VYG6P 9KG", brand: "LG", category: "Appliances", sub: "Washing Machines", price: 650, image_prompt: "Stainless steel LG washing machine AI DD" },
    { name: "Sharp ES-FE912DLZ 9KG", brand: "Sharp", category: "Appliances", sub: "Washing Machines", price: 420, image_prompt: "Silver Sharp washing machine front load" },
    { name: "LG T19H3SDHT2 19KG", brand: "LG", category: "Appliances", sub: "Washing Machines", price: 900, image_prompt: "Black LG top load washing machine massive capacity" },

    // --- DRYERS (Source: DRYER.pdf) ---
    { name: "LG RH80TAP6RM 8KG Heat Pump", brand: "LG", category: "Appliances", sub: "Dryers", price: 700, image_prompt: "White LG heat pump dryer dual inverter" },
    { name: "Samsung DV90T5240AX 9KG", brand: "Samsung", category: "Appliances", sub: "Dryers", price: 750, image_prompt: "Inox Samsung dryer heat pump AI control" },

    // --- TV & AUDIO (Source: TV & AUDIO.pdf) ---
    { name: "General Pro 5006 50\" 4K", brand: "General Pro", category: "Electronics", sub: "TVs", price: 350, image_prompt: "50 inch smart TV displaying vibrant colors dark room" },
    { name: "Samsung 55Q60D QLED", brand: "Samsung", category: "Electronics", sub: "TVs", price: 700, image_prompt: "Samsung QLED TV slim design blue background" },
    { name: "TCL 65P6K 65\" 4K", brand: "TCL", category: "Electronics", sub: "TVs", price: 550, image_prompt: "65 inch TCL smart TV ultra thin bezel" },
    { name: "Samsung HWQ800F Soundbar", brand: "Samsung", category: "Electronics", sub: "Audio", price: 450, image_prompt: "Samsung soundbar with subwoofer home theater setup" },
    { name: "LG XBOOM ON7", brand: "LG", category: "Electronics", sub: "Audio", price: 300, image_prompt: "LG XBOOM party speaker with LED lights" },

    // --- KITCHEN (Source: KITCHEN & OTHERS.pdf) ---
    { name: "Philips Airfryer HD9252", brand: "Philips", category: "Kitchen", sub: "Air Fryers", price: 75, image_prompt: "Black Philips airfryer cooking french fries" },
    { name: "Tefal Easy Fry EY905870 XXL", brand: "Tefal", category: "Kitchen", sub: "Air Fryers", price: 180, image_prompt: "Dual drawer Tefal air fryer stainless steel" },
    { name: "Kenwood MGP40 Meat Mincer", brand: "Kenwood", category: "Kitchen", sub: "Food Prep", price: 80, image_prompt: "Silver Kenwood meat grinder heavy duty" },
    { name: "Braun Multiquick 7 Hand Blender", brand: "Braun", category: "Kitchen", sub: "Blenders", price: 100, image_prompt: "Braun hand blender stainless steel shaft splashing soup" },
    { name: "Moulinex Food Processor FP821811", brand: "Moulinex", category: "Kitchen", sub: "Food Prep", price: 110, image_prompt: "Moulinex food processor with slicing discs" },
    { name: "Panasonic Water Dispenser WD3128", brand: "Panasonic", category: "Kitchen", sub: "Dispensers", price: 105, image_prompt: "Silver Panasonic water dispenser top load" },

    // --- FRIDGES (Source: REFREGIRATOR.pdf) ---
    { name: "LG GL-131SQQ 1 Door", brand: "LG", category: "Appliances", sub: "Refrigerators", price: 200, image_prompt: "Small white single door LG refrigerator" },
    { name: "Samsung RR39 Twin Fridge", brand: "Samsung", category: "Appliances", sub: "Refrigerators", price: 1200, image_prompt: "Tall stainless steel Samsung twin refrigerator and freezer pair" },
    { name: "Sharp SJ-GP75D-BK5 Glass Black", brand: "Sharp", category: "Appliances", sub: "Refrigerators", price: 850, image_prompt: "Black glass finish Sharp refrigerator modern kitchen" },

    // --- BEAUTY (Source: HAIR & BEAUTY.pdf) ---
    { name: "Braun Silk-épil 3 SE3000", brand: "Braun", category: "Beauty", sub: "Hair Removal", price: 28, image_prompt: "Pink Braun silk-epil 3 device studio shot" },
    { name: "Braun Silk-épil 9 SE9041", brand: "Braun", category: "Beauty", sub: "Hair Removal", price: 120, image_prompt: "White and gold Braun silk-epil 9 wet and dry" },
    { name: "BaByliss 6709DE Hair Dryer", brand: "BaByliss", category: "Beauty", sub: "Hair Care", price: 39, image_prompt: "Black BaByliss pro hair dryer 2100W" },
    { name: "Philips Multigroom MG7940 15-in-1", brand: "Philips", category: "Beauty", sub: "Grooming", price: 70, image_prompt: "Metal Philips trimmer with many attachments arranged neatly" },

    // --- AC & VACUUM (Source: AC.pdf, VACCUM.pdf) ---
    { name: "TCL 12000 BTU Inverter AC", brand: "TCL", category: "Heating & Cooling", sub: "ACs", price: 350, image_prompt: "White split air conditioner unit on wall" },
    { name: "Bissell PowerForce Helix Vacuum", brand: "Bissell", category: "Home Care", sub: "Vacuums", price: 85, image_prompt: "Upright Bissell vacuum cleaner blue and black" },
    { name: "Hoover Carpet Cleaner CDCW-PDME", brand: "Hoover", category: "Home Care", sub: "Vacuums", price: 150, image_prompt: "Hoover carpet washer cleaning rug" },

    // --- TOOLS (Source: Previous Seed) ---
    { name: "Yale Fireproof Safe Large", brand: "Yale", category: "Tools", sub: "Security", price: 299, image_prompt: "Heavy-duty digital safe fireproof" },
    { name: "Satellite Receiver 4K Android", category: "Tools", sub: "Accessories", price: 65, image_prompt: "Android TV box satellite receiver 4k" }
];
