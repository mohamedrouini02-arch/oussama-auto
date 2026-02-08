/**
 * Upload Car Images to Supabase Storage
 * Run with: node scripts/upload-car-images.js
 * 
 * NOTE: Make sure the "car-images" bucket exists in Supabase Storage
 * and is set to public before running this script.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://lfvjgeeeozvamomlpsjc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdmpnZWVlb3p2YW1vbWdwc2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzczOTAsImV4cCI6MjA4NjA1MzM5MH0.xKABxU85KN43L0lQtY6YNRWYzM1tbZr-WT-Qjgg9UAY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'car-images';
const CARS_DIR = path.join(__dirname, '..', 'public', 'cars');

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

async function uploadImage(carId, fileName) {
    const filePath = path.join(CARS_DIR, carId, fileName);

    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  File not found: ${filePath}`);
        return null;
    }

    const fileBuffer = fs.readFileSync(filePath);
    // Sanitize filename to remove spaces and special characters
    const sanitizedFileName = fileName.replace(/\s+/g, '_').replace(/[()]/g, '');
    const storagePath = `${carId}/${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
            contentType: 'image/jpeg',
            upsert: true
        });

    if (error) {
        console.log(`  ❌ Error uploading ${fileName}: ${error.message}`);
        return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

    console.log(`  ✅ Uploaded: ${fileName}`);
    return urlData.publicUrl;
}

async function uploadCarImages(carId) {
    const carDir = path.join(CARS_DIR, carId);

    if (!fs.existsSync(carDir)) {
        console.log(`⚠️  Directory not found: ${carDir}`);
        return null;
    }

    const files = fs.readdirSync(carDir).filter(f =>
        f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp')
    );

    console.log(`\n📁 ${carId} (${files.length} images)`);

    const result = {
        id: carId,
        mainImage: null,
        images: []
    };

    // Sort files: main first, then exterior, then interior, then trunk
    const sortedFiles = files.sort((a, b) => {
        const order = ['main', 'exterior', 'interior', 'trunk'];
        const aOrder = order.findIndex(o => a.toLowerCase().includes(o));
        const bOrder = order.findIndex(o => b.toLowerCase().includes(o));
        return (aOrder === -1 ? 99 : aOrder) - (bOrder === -1 ? 99 : bOrder);
    });

    for (const file of sortedFiles) {
        const url = await uploadImage(carId, file);
        if (url) {
            if (file.toLowerCase().includes('main')) {
                result.mainImage = url;
            } else {
                result.images.push(url);
            }
        }
    }

    // If no main image, use the first image as main
    if (!result.mainImage && result.images.length > 0) {
        result.mainImage = result.images.shift();
    }

    return result;
}

async function generateCarsUpdate(uploadedCars) {
    const outputPath = path.join(__dirname, 'car-images-urls.json');

    const output = {};
    for (const car of uploadedCars) {
        if (car) {
            output[car.id] = {
                image: car.mainImage,
                images: car.images
            };
        }
    }

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n📄 URLs saved to: ${outputPath}`);

    return output;
}

async function main() {
    console.log('🚗 Car Images Upload to Supabase\n');
    console.log('================================\n');
    console.log(`Using bucket: ${BUCKET_NAME}`);
    console.log('Make sure this bucket exists and is public in Supabase!\n');

    // Upload images for each car
    const uploadedCars = [];
    for (const carId of CAR_IDS) {
        const result = await uploadCarImages(carId);
        uploadedCars.push(result);
    }

    // Generate output file
    const urls = await generateCarsUpdate(uploadedCars);

    console.log('\n================================');
    console.log('✅ Upload complete!\n');
    console.log('Next steps:');
    console.log('1. Check scripts/car-images-urls.json for all URLs');
    console.log('2. The cars.ts file will be updated automatically');
    console.log('================================\n');

    return urls;
}

main().catch(console.error);
