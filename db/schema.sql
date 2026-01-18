-- Lissie's Beauty Essentials - Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 999,
  is_coming_soon BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  campus_location TEXT,
  note TEXT,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for date-based queries and admin dashboard
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- =============================================
-- ORDER ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for order lookups
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: Public read, authenticated users can write
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert products" 
  ON products FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" 
  ON products FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete products" 
  ON products FOR DELETE 
  TO authenticated 
  USING (true);

-- Orders: Authenticated users can manage, service role for creation
CREATE POLICY "Authenticated users can view all orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Anyone can create orders" 
  ON orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders" 
  ON orders FOR UPDATE 
  TO authenticated 
  USING (true);

-- Order Items: Same as orders
CREATE POLICY "Authenticated users can view order items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Anyone can create order items" 
  ON order_items FOR INSERT 
  WITH CHECK (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- STORAGE BUCKET (Run separately in Supabase Dashboard)
-- =============================================
-- Create a public bucket called 'products' for product images
-- Storage > New Bucket > Name: "products" > Public: true
