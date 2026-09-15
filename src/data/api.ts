import { supabase } from '../lib/supabase'
import type { CarData } from './cars'

/**
 * Fetch all active cars from Supabase website_cars table
 * Maps database column names to the CarData interface
 */
export async function fetchCars(): Promise<CarData[]> {
    const { data, error } = await supabase
        .from('website_cars')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

    if (error) {
        console.error('Error fetching cars:', error)
        return []
    }

    return (data || []).map(row => ({
        id: row.slug,
        brand: row.brand,
        brandAr: row.brand_ar,
        brandFr: row.brand_fr,
        model: row.model,
        modelAr: row.model_ar,
        modelFr: row.model_fr,
        year: row.year,
        endYear: row.end_year || undefined,
        description: row.description_ar,
        descriptionFr: row.description_fr,
        priceMin: row.price_min,
        priceMax: row.price_max,
        image: row.image,
        images: row.images || [],
        engine: row.engine,
        engineFr: row.engine_fr,
        transmission: row.transmission,
        transmissionFr: row.transmission_fr,
        fuelType: row.fuel_type,
        fuelTypeFr: row.fuel_type_fr,
        seats: row.seats,
        features: row.features || [],
        featuresFr: row.features_fr || [],
        colors: row.colors || [],
        colorsFr: row.colors_fr || [],
        category: row.category,
        isPopular: row.is_popular,
        origin: row.origin,
        sortOrder: row.sort_order,
    }))
}

export async function fetchPopularCars(): Promise<CarData[]> {
    const { data, error } = await supabase
        .from('website_cars')
        .select('*')
        .eq('is_active', true)
        .eq('is_popular', true)
        .order('sort_order', { ascending: true })

    if (error) {
        console.error('Error fetching popular cars:', error)
        return []
    }

    return (data || []).map(row => ({
        id: row.slug,
        brand: row.brand,
        brandAr: row.brand_ar,
        brandFr: row.brand_fr,
        model: row.model,
        modelAr: row.model_ar,
        modelFr: row.model_fr,
        year: row.year,
        endYear: row.end_year || undefined,
        description: row.description_ar,
        descriptionFr: row.description_fr,
        priceMin: row.price_min,
        priceMax: row.price_max,
        image: row.image,
        images: row.images || [],
        engine: row.engine,
        engineFr: row.engine_fr,
        transmission: row.transmission,
        transmissionFr: row.transmission_fr,
        fuelType: row.fuel_type,
        fuelTypeFr: row.fuel_type_fr,
        seats: row.seats,
        features: row.features || [],
        featuresFr: row.features_fr || [],
        colors: row.colors || [],
        colorsFr: row.colors_fr || [],
        category: row.category,
        isPopular: row.is_popular,
        origin: row.origin,
        sortOrder: row.sort_order,
    }))
}

export async function fetchCarById(id: string): Promise<CarData | null> {
    const { data, error } = await supabase
        .from('website_cars')
        .select('*')
        .eq('slug', id)
        .eq('is_active', true)
        .single()

    if (error || !data) return null

    return {
        id: data.slug,
        brand: data.brand,
        brandAr: data.brand_ar,
        brandFr: data.brand_fr,
        model: data.model,
        modelAr: data.model_ar,
        modelFr: data.model_fr,
        year: data.year,
        endYear: data.end_year || undefined,
        description: data.description_ar,
        descriptionFr: data.description_fr,
        priceMin: data.price_min,
        priceMax: data.price_max,
        image: data.image,
        images: data.images || [],
        engine: data.engine,
        engineFr: data.engine_fr,
        transmission: data.transmission,
        transmissionFr: data.transmission_fr,
        fuelType: data.fuel_type,
        fuelTypeFr: data.fuel_type_fr,
        seats: data.seats,
        features: data.features || [],
        featuresFr: data.features_fr || [],
        colors: data.colors || [],
        colorsFr: data.colors_fr || [],
        category: data.category,
        isPopular: data.is_popular,
        origin: data.origin,
        sortOrder: data.sort_order,
    }
}

/**
 * Fetch editable website content by section
 */
export async function fetchContent(section: string): Promise<Record<string, string>> {
    const { data, error } = await supabase
        .from('website_content')
        .select('content')
        .eq('section', section)
        .single()

    if (error || !data) return {}
    return data.content as Record<string, string>
}

/**
 * Safely format image URLs.
 * If it's a full URL (Supabase), return as-is.
 * If it's a relative path without a slash, prepend it.
 */
export function getImageUrl(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (!path.startsWith('/')) return `/${path}`;
    return path;
}

export interface InventoryCar {
    id: string
    brand: string
    model: string
    year: number
    carTrim?: string
    carEnergy?: string
    carTransmission?: string
    countryOfOrigin?: string
    color?: string
    mileage?: number
    vin?: string
    sellingPrice?: number
    currency?: string
    location?: string
    status?: 'available' | 'reserved' | 'sold'
    photosUrls: string[]
    videoUrl?: string
    notes?: string
    createdAt?: string
}

const SUPABASE_STORAGE_URL = 'https://lfvjgeeeozvamomgpsjc.supabase.co/storage/v1/object/public/car-media/'

export function formatInventoryImageUrl(path: string | undefined | null): string {
    if (!path) return ''
    if (path.startsWith('http')) return path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${SUPABASE_STORAGE_URL}${cleanPath}`
}

/**
 * Fetch cars directly from the live car_inventory table
 */
export async function fetchInventoryCars(): Promise<InventoryCar[]> {
    try {
        const { data, error } = await supabase
            .from('car_inventory')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching inventory cars:', error)
            return []
        }

        return (data || []).map(row => {
            const rawPhotos = Array.isArray(row.photos_urls) && row.photos_urls.length > 0
                ? row.photos_urls
                : (Array.isArray(row.photos) ? row.photos : [])

            const normalizedPhotos = rawPhotos.map(formatInventoryImageUrl).filter(Boolean)

            // Normalize origin
            let origin = row.country_of_origin?.toLowerCase() || ''
            if (!origin) {
                const loc = (row.location || '').toLowerCase()
                if (loc.includes('korea') || loc.includes('corée') || loc.includes('كوري')) {
                    origin = 'korean'
                } else if (loc.includes('china') || loc.includes('chine') || loc.includes('صين')) {
                    origin = 'chinese'
                }
            } else if (origin.includes('korea') || origin.includes('corée') || origin.includes('كوري')) {
                origin = 'korean'
            } else if (origin.includes('china') || origin.includes('chine') || origin.includes('صين')) {
                origin = 'chinese'
            }

            return {
                id: row.id,
                brand: row.brand || '',
                model: row.model || '',
                year: row.year || new Date().getFullYear(),
                carTrim: row.car_trim || '',
                carEnergy: row.car_energy || '',
                carTransmission: row.car_transmission || '',
                countryOfOrigin: origin,
                color: row.color || '',
                mileage: row.mileage || 0,
                vin: row.vin || row.vin_number || '',
                sellingPrice: row.selling_price || 0,
                currency: row.currency || 'DZD',
                location: row.location || '',
                status: (row.status?.toLowerCase() as 'available' | 'reserved' | 'sold') || 'available',
                photosUrls: normalizedPhotos,
                videoUrl: row.video_url || '',
                notes: row.notes || '',
                createdAt: row.created_at || undefined,
            }
        })
    } catch (err) {
        console.error('Failed to fetch inventory:', err)
        return []
    }
}

/**
 * Fetch a single inventory car by ID
 */
export async function fetchInventoryCarById(id: string): Promise<InventoryCar | null> {
    try {
        const { data, error } = await supabase
            .from('car_inventory')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !data) return null

        const rawPhotos = Array.isArray(data.photos_urls) && data.photos_urls.length > 0
            ? data.photos_urls
            : (Array.isArray(data.photos) ? data.photos : [])

        const normalizedPhotos = rawPhotos.map(formatInventoryImageUrl).filter(Boolean)

        let origin = data.country_of_origin?.toLowerCase() || ''
        if (!origin) {
            const loc = (data.location || '').toLowerCase()
            if (loc.includes('korea') || loc.includes('corée') || loc.includes('كوري')) {
                origin = 'korean'
            } else if (loc.includes('china') || loc.includes('chine') || loc.includes('صين')) {
                origin = 'chinese'
            }
        } else if (origin.includes('korea') || origin.includes('corée') || origin.includes('كوري')) {
            origin = 'korean'
        } else if (origin.includes('china') || origin.includes('chine') || origin.includes('صين')) {
            origin = 'chinese'
        }

        return {
            id: data.id,
            brand: data.brand || '',
            model: data.model || '',
            year: data.year || new Date().getFullYear(),
            carTrim: data.car_trim || '',
            carEnergy: data.car_energy || '',
            carTransmission: data.car_transmission || '',
            countryOfOrigin: origin,
            color: data.color || '',
            mileage: data.mileage || 0,
            vin: data.vin || data.vin_number || '',
            sellingPrice: data.selling_price || 0,
            currency: data.currency || 'DZD',
            location: data.location || '',
            status: (data.status?.toLowerCase() as 'available' | 'reserved' | 'sold') || 'available',
            photosUrls: normalizedPhotos,
            videoUrl: data.video_url || '',
            notes: data.notes || '',
            createdAt: data.created_at || undefined,
        }
    } catch (err) {
        console.error('Failed to fetch inventory car by id:', err)
        return null
    }
}
