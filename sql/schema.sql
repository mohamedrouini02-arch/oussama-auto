-- ================================================
-- OUSSAMA AUTO - SUPABASE DATABASE SCHEMA
-- Complete SQL schema for car import website
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- 1. ORDERS TABLE
-- Main table for customer order submissions
-- ================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    wilaya TEXT NOT NULL,
    car_brand TEXT NOT NULL,
    car_model TEXT NOT NULL,
    budget TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending',      -- في الانتظار
        'confirmed',    -- مؤكد
        'purchased',    -- تم الشراء
        'shipped',      -- تم الشحن
        'customs',      -- في الجمارك
        'ready',        -- جاهز للاستلام
        'delivered'     -- تم التسليم
    )),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster reference number lookups
CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders(reference_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ================================================
-- 2. CARS TABLE
-- Car catalog/inventory
-- ================================================
CREATE TABLE IF NOT EXISTS cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    description_ar TEXT NOT NULL,
    description_fr TEXT,
    starting_price DECIMAL(12, 2) NOT NULL,
    image_url TEXT NOT NULL,
    engine TEXT,
    transmission TEXT,
    fuel_type TEXT,
    seats INTEGER DEFAULT 5,
    features JSONB DEFAULT '[]'::jsonb,
    colors JSONB DEFAULT '[]'::jsonb,
    is_popular BOOLEAN DEFAULT false,
    category TEXT CHECK (category IN ('city', 'suv', 'sedan', 'hatchback', 'truck')),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for popular cars query
CREATE INDEX IF NOT EXISTS idx_cars_popular ON cars(is_popular) WHERE is_popular = true;
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);

-- ================================================
-- 3. SHIPPING FORMS TABLE
-- Shipping information forms
-- ================================================
CREATE TABLE IF NOT EXISTS shipping_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    full_address TEXT NOT NULL,
    postal_code TEXT,
    zip_code TEXT,
    vehicle_model TEXT NOT NULL,
    vin_number TEXT NOT NULL,
    photos JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 4. DOCUMENTS TABLE
-- Uploaded customs documents
-- ================================================
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT NOT NULL, -- Reference number as string
    document_type TEXT NOT NULL CHECK (document_type IN (
        'passport',
        'id_card',
        'residence',
        'license',
        'other'
    )),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for order documents
CREATE INDEX IF NOT EXISTS idx_documents_order ON documents(order_id);

-- ================================================
-- 5. ORDER TRACKING TABLE
-- Order status history/timeline
-- ================================================
CREATE TABLE IF NOT EXISTS order_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    description TEXT,
    tracking_number TEXT,
    estimated_delivery DATE,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for order tracking history
CREATE INDEX IF NOT EXISTS idx_tracking_order ON order_tracking(order_id);

-- ================================================
-- 6. CONTACTS TABLE
-- Contact form submissions
-- ================================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for unread contacts
CREATE INDEX IF NOT EXISTS idx_contacts_unread ON contacts(is_read) WHERE is_read = false;

-- ================================================
-- 7. NEWSLETTER SUBSCRIBERS TABLE
-- Newsletter subscription emails
-- ================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- AUTO-UPDATE TIMESTAMPS TRIGGER
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cars_updated_at
    BEFORE UPDATE ON cars
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipping_forms_updated_at
    BEFORE UPDATE ON shipping_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS for security
-- ================================================

-- Enable RLS on all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for cars (catalog is public)
CREATE POLICY "Cars are viewable by everyone"
    ON cars FOR SELECT
    USING (true);

-- Public insert for orders (anyone can submit an order)
CREATE POLICY "Anyone can create an order"
    ON orders FOR INSERT
    WITH CHECK (true);

-- Orders can be read by reference number (for tracking)
CREATE POLICY "Orders viewable by reference number"
    ON orders FOR SELECT
    USING (true);

-- Public insert for shipping forms
CREATE POLICY "Anyone can submit shipping form"
    ON shipping_forms FOR INSERT
    WITH CHECK (true);

-- Public insert for documents
CREATE POLICY "Anyone can upload documents"
    ON documents FOR INSERT
    WITH CHECK (true);

-- Public insert for contacts
CREATE POLICY "Anyone can submit contact form"
    ON contacts FOR INSERT
    WITH CHECK (true);

-- Public insert for newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
    ON newsletter_subscribers FOR INSERT
    WITH CHECK (true);

-- Order tracking is readable
CREATE POLICY "Tracking is viewable"
    ON order_tracking FOR SELECT
    USING (true);

-- ================================================
-- STORAGE BUCKETS
-- Run these in Supabase Dashboard > Storage
-- ================================================

-- Create storage buckets (run in Supabase SQL Editor or Dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('shipping-photos', 'shipping-photos', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('car-images', 'car-images', true);

-- Storage policies for public upload
-- CREATE POLICY "Public upload for shipping-photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'shipping-photos');
-- CREATE POLICY "Public read for shipping-photos" ON storage.objects FOR SELECT USING (bucket_id = 'shipping-photos');
-- CREATE POLICY "Public upload for documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents');
-- CREATE POLICY "Public read for documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');

-- ================================================
-- SAMPLE DATA (Optional)
-- ================================================

-- Insert sample car data
INSERT INTO cars (brand, model, year, description_ar, starting_price, image_url, engine, transmission, fuel_type, seats, features, colors, is_popular, category) VALUES
('Kia', 'Morning', 2024, 'سيارة صغيرة مثالية للمدينة، اقتصادية في استهلاك الوقود', 1800000, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', '1.0L 3-سلندر', 'أوتوماتيك', 'بنزين', 4, '["شاشة لمس", "كاميرا خلفية", "بلوتوث"]', '["أبيض", "أسود", "فضي"]', true, 'city'),
('Kia', 'Sportage', 2024, 'سيارة SUV عائلية بتصميم عصري', 4500000, 'https://images.unsplash.com/photo-1606611013016-969c19af47bd?w=800', '2.0L 4-سلندر', 'أوتوماتيك', 'بنزين', 5, '["شاشة لمس كبيرة", "كاميرا 360°", "مقاعد جلد"]', '["أبيض لؤلؤي", "أسود", "رمادي"]', true, 'suv'),
('Hyundai', 'Elantra', 2024, 'سيدان فاخرة بتصميم مستقبلي', 3500000, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', '2.0L 4-سلندر', 'أوتوماتيك', 'بنزين', 5, '["شاشة رقمية", "نظام Bluelink", "شحن لاسلكي"]', '["أبيض", "أسود", "أزرق"]', true, 'sedan')
ON CONFLICT DO NOTHING;
