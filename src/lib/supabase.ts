import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lfvjgeeeozvamomlpsjc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdmpnZWVlb3p2YW1vbWdwc2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzczOTAsImV4cCI6MjA4NjA1MzM5MH0.xKABxU85KN43L0lQtY6YNRWYzM1tbZr-WT-Qjgg9UAY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Generate reference number in format WA-YEAR-XXXXXX
export function generateReferenceNumber(): string {
    const year = new Date().getFullYear()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `WA-${year}-${random}`
}

// Types for database tables
export interface Order {
    id?: string
    reference_number: string
    full_name: string
    phone: string
    email?: string
    wilaya: string
    car_brand: string
    car_model: string
    budget: string
    notes?: string
    status: string
    created_at?: string
}

export interface Car {
    id?: string
    brand: string
    model: string
    year: number
    description_ar: string
    description_fr?: string
    starting_price: number
    image_url: string
    engine: string
    transmission: string
    fuel_type: string
    seats: number
    features: string[]
    is_popular: boolean
    created_at?: string
}

export interface ShippingForm {
    id?: string
    order_id?: string
    customer_name: string
    customer_email: string
    customer_phone: string
    passport_number: string
    full_address: string
    postal_code: string
    zip_code: string
    vehicle_model: string
    vin_number: string
    photos: string[]
    status: string
    created_at?: string
}

export interface Contact {
    id?: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    created_at?: string
}

export interface OrderTracking {
    id?: string
    order_id: string
    status: string
    description?: string
    tracking_number?: string
    estimated_delivery?: string
    created_at?: string
}

export interface Document {
    id?: string
    order_id: string
    document_type: string
    file_url: string
    file_name: string
    uploaded_at?: string
}
