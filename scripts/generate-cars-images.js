/**
 * Generate cars.ts with local image paths
 * Run with: node scripts/generate-cars-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CARS_DIR = path.join(__dirname, '..', 'public', 'cars');
const OUTPUT_PATH = path.join(__dirname, 'car-images-local.json');

// Car IDs that match the cars.ts file
const CAR_IDS = [
    'chevrolet-spark',
    'kia-morning',
    'hyundai-casper',
    'renault-arkana',
    'hyundai-venue',
    'kia-seltos',
    'kia-k3',
    'hyundai-elantra',
    'kia-k5',
    'kia-sportage',
    'hyundai-tucson',
    'hyundai-santafe',
    'kia-sorento'
];

function getCarImages(carId) {
    const carDir = path.join(CARS_DIR, carId);

    if (!fs.existsSync(carDir)) {
        console.log(`⚠️  Directory not found: ${carDir}`);
        return null;
    }

    const files = fs.readdirSync(carDir).filter(f =>
        f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp')
    );

    // Sort files: main first, then exterior, then interior, then trunk
    const sortedFiles = files.sort((a, b) => {
        const order = ['main', 'exterior', 'interior', 'trunk'];
        const aOrder = order.findIndex(o => a.toLowerCase().includes(o));
        const bOrder = order.findIndex(o => b.toLowerCase().includes(o));
        if (aOrder !== bOrder) return (aOrder === -1 ? 99 : aOrder) - (bOrder === -1 ? 99 : bOrder);

        // Extract numbers for same category
        const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
    });

    const result = {
        mainImage: null,
        images: []
    };

    for (const file of sortedFiles) {
        const localPath = `/cars/${carId}/${file}`;
        if (file.toLowerCase().includes('main')) {
            result.mainImage = localPath;
        } else {
            result.images.push(localPath);
        }
    }

    // If no main image, use the first image as main
    if (!result.mainImage && result.images.length > 0) {
        result.mainImage = result.images.shift();
    }

    console.log(`📁 ${carId}: main + ${result.images.length} gallery images`);
    return result;
}

function main() {
    console.log('🚗 Generating Local Image Paths\n');
    console.log('================================\n');

    const output = {};

    for (const carId of CAR_IDS) {
        const images = getCarImages(carId);
        if (images) {
            output[carId] = images;
        }
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
    console.log(`\n📄 Local paths saved to: ${OUTPUT_PATH}`);

    // Generate TypeScript snippet
    console.log('\n================================');
    console.log('📋 TypeScript Snippet for cars.ts:\n');

    for (const [carId, data] of Object.entries(output)) {
        console.log(`// ${carId}`);
        console.log(`image: '${data.mainImage}',`);
        console.log(`images: [`);
        data.images.forEach(img => console.log(`    '${img}',`));
        console.log(`],\n`);
    }

    return output;
}

main();
