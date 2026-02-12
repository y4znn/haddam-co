import { products } from '../lib/data';

console.log(`\n--- SEED VERIFICATION ---`);
console.log(`Total Products Seeded: ${products.length}`);
console.log(`Checking Categories:`);
const categories = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.table(categories);
console.log(`-------------------------\n`);
