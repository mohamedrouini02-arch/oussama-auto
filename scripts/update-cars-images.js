/**
 * Update cars.ts with local image paths
 * Run with: node scripts/update-cars-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CARS_FILE = path.join(__dirname, '..', 'src', 'data', 'cars.ts');
const IMAGES_FILE = path.join(__dirname, 'car-images-local.json');

// Read the image data
const imageData = JSON.parse(fs.readFileSync(IMAGES_FILE, 'utf8'));

// Read the current cars.ts file
let carsContent = fs.readFileSync(CARS_FILE, 'utf8');

// For each car, update the image and add images array
for (const [carId, data] of Object.entries(imageData)) {
    console.log(`Updating ${carId}...`);

    // Find the car entry and update it
    // Match pattern: id: 'car-id', ... image: '...',
    const idPattern = new RegExp(`id: '${carId}'`);

    if (!idPattern.test(carsContent)) {
        console.log(`  ⚠️  Car ${carId} not found in cars.ts`);
        continue;
    }

    // Find the image line for this car and replace it
    // We need to find the car block first
    const carBlockStart = carsContent.indexOf(`id: '${carId}'`);
    if (carBlockStart === -1) continue;

    // Find the next image: line after this car id
    const imageLineStart = carsContent.indexOf(`image:`, carBlockStart);
    if (imageLineStart === -1) continue;

    // Find the end of this line
    const imageLineEnd = carsContent.indexOf(',', imageLineStart);
    if (imageLineEnd === -1) continue;

    // Check if there's already an images array after this
    const nextLine = carsContent.substring(imageLineEnd + 1, imageLineEnd + 100);
    const hasImagesArray = nextLine.trim().startsWith('images:');

    // Build the new image lines
    const newImageLine = `image: '${data.mainImage}'`;
    const imagesArrayLines = [
        `images: [`,
        ...data.images.map(img => `            '${img}',`),
        `        ],`
    ].join('\n        ');

    if (hasImagesArray) {
        // Find the end of the existing images array and replace both image and images
        const imagesStart = carsContent.indexOf('images:', imageLineEnd);
        const imagesEnd = carsContent.indexOf('],', imagesStart) + 2;

        // Replace from image: to end of images array
        const oldSection = carsContent.substring(imageLineStart, imagesEnd);
        const newSection = `${newImageLine},\n        ${imagesArrayLines}`;
        carsContent = carsContent.replace(oldSection, newSection);
    } else {
        // Just replace the image line and add images array after
        const oldImageLine = carsContent.substring(imageLineStart, imageLineEnd + 1);
        const newSection = `${newImageLine},\n        ${imagesArrayLines}`;
        carsContent = carsContent.replace(oldImageLine, newSection);
    }

    console.log(`  ✅ Updated with ${data.images.length + 1} images`);
}

// Write the updated content back
fs.writeFileSync(CARS_FILE, carsContent);

console.log('\n================================');
console.log('✅ cars.ts has been updated!');
console.log('================================\n');
