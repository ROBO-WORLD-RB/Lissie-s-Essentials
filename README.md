# Lissie's Beauty Essentials

A responsive, accessible ecommerce site for beauty products built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- 🛍️ Product catalog with category filtering
- 🛒 Shopping cart with localStorage persistence
- 📱 WhatsApp order integration
- 👩‍💼 Admin dashboard for products and orders
- 🎨 Beautiful nude palette design
- ♿ Accessible and responsive UI

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for server)
- `NEXT_PUBLIC_STORE_PHONE` - WhatsApp number (e.g., `2335003099327`)

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Open SQL Editor and run the schema:
   ```sql
   -- Copy contents of db/schema.sql
   ```
3. Create a storage bucket named `products` (optional, for image uploads)
4. Insert sample products from `db/seed_products.json`

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   ├── cart/            # Cart page
│   ├── checkout/        # Checkout page
│   ├── products/        # Product pages
│   └── ...
├── components/          # React components
├── hooks/               # Custom hooks (useCart)
├── lib/                 # Utilities (Supabase client)
├── types/               # TypeScript types
└── utils/               # Helper functions
```

## WhatsApp Integration

Orders are completed via WhatsApp. The checkout flow:
1. Customer fills order form
2. System creates order record in Supabase
3. Generates WhatsApp link with prefilled message
4. Customer confirms order via WhatsApp

## Admin Access

1. Create a user in Supabase Auth dashboard
2. Navigate to `/admin/login`
3. Sign in with your credentials

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Vercel

Set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STORE_PHONE`

## Product Images

Replace placeholder images in `/public/images/products/`:
- Use format: `{slug}.jpg`
- Recommended size: 800x800px
- Fallback: `placeholder-product.jpg`

## License

MIT
