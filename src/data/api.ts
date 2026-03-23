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
