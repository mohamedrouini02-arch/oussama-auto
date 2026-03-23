/**
 * Data Seeding Script
 * Run this ONCE to migrate existing hardcoded cars from cars.ts into Supabase website_cars table
 * 
 * Usage (from website directory):
 *   npx tsx src/data/seed.ts
 * 
 * Prerequisites:
 *   1. Run cms_migration.sql in Supabase SQL Editor first
 *   2. npm install tsx (if not already installed)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lfvjgeeeozvamomgpsjc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdmpnZWVlb3p2YW1vbWdwc2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzczOTAsImV4cCI6MjA4NjA1MzM5MH0.xKABxU85KN43L0lQtY6YNRWYzM1tbZr-WT-Qjgg9UAY'

const supabase = createClient(supabaseUrl, supabaseKey)

// Import the car data
import { cars } from './cars'

async function seed() {
    console.log(`Seeding ${cars.length} cars into website_cars...`)

    for (const car of cars) {
        const row = {
            slug: car.id,
            brand: car.brand,
            brand_ar: car.brandAr,
            brand_fr: car.brandFr,
            model: car.model,
            model_ar: car.modelAr,
            model_fr: car.modelFr,
            year: car.year,
            end_year: car.endYear || null,
            description_ar: car.description,
            description_fr: car.descriptionFr,
            price_min: car.priceMin,
            price_max: car.priceMax,
            image: car.image,
            images: car.images || [],
            engine: car.engine,
            engine_fr: car.engineFr,
            transmission: car.transmission,
            transmission_fr: car.transmissionFr,
            fuel_type: car.fuelType,
            fuel_type_fr: car.fuelTypeFr,
            seats: car.seats,
            features: car.features,
            features_fr: car.featuresFr,
            colors: car.colors,
            colors_fr: car.colorsFr,
            category: car.category,
            is_popular: car.isPopular,
            origin: car.origin,
            is_active: true,
        }

        const { error } = await supabase
            .from('website_cars')
            .upsert(row, { onConflict: 'slug' })

        if (error) {
            console.error(`Error seeding ${car.id}:`, error.message)
        } else {
            console.log(`✓ ${car.brand} ${car.model}`)
        }
    }

    console.log('Done!')
}

seed()
