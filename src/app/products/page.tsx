import { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Shop All Products",
    description:
        "Browse our complete collection of beauty essentials. Lip scrubs, lip gloss, lip liners, lip masks, hand creams, face masks, and perfumes.",
};

// Categories for filtering
const categories = [
    { slug: "all", name: "All Products" },
    { slug: "lip-scrub", name: "Lip Scrubs" },
    { slug: "lip-gloss", name: "Lip Gloss" },
    { slug: "lip-liner", name: "Lip Liners" },
    { slug: "lip-mask", name: "Lip Masks" },
    { slug: "hand-cream", name: "Hand Creams" },
    { slug: "face-mask", name: "Face Masks" },
    { slug: "perfume", name: "Perfumes" },
];

// Sample products (will be replaced with Supabase data)
const allProducts: Product[] = [
    {
        id: "1",
        slug: "strawberry-lip-scrub",
        name: "Strawberry Lip Scrub",
        description: "Gently exfoliate and nourish your lips with our sweet strawberry lip scrub.",
        price: 0,
        category: "lip-scrub",
        image_url: "/images/products/lip-scrub.jpg",
        stock: 50,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        slug: "vanilla-lip-scrub",
        name: "Vanilla Bean Lip Scrub",
        description: "Indulge in the warm, comforting scent of vanilla.",
        price: 0,
        category: "lip-scrub",
        image_url: "/images/products/lip-exfoliator.jpg",
        stock: 45,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        slug: "rose-petal-lip-gloss",
        name: "Rose Petal Lip Gloss",
        description: "A stunning rose-tinted gloss that adds beautiful sheen.",
        price: 0,
        category: "lip-gloss",
        image_url: "/images/products/lip-gloss.jpg",
        stock: 60,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "4",
        slug: "clear-shimmer-lip-gloss",
        name: "Clear Shimmer Lip Gloss",
        description: "Add a touch of sparkle with our clear shimmer gloss.",
        price: 0,
        category: "lip-gloss",
        image_url: "/images/products/lip-gloss.jpg",
        stock: 55,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "5",
        slug: "nude-lip-liner",
        name: "Classic Nude Lip Liner",
        description: "Define and shape your lips with our creamy nude lip liner.",
        price: 0,
        category: "lip-liner",
        image_url: "/images/products/lip-exfoliator.jpg",
        stock: 40,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "6",
        slug: "berry-lip-liner",
        name: "Berry Blush Lip Liner",
        description: "A gorgeous berry shade that pairs perfectly with our lip glosses.",
        price: 0,
        category: "lip-liner",
        image_url: "/images/products/lip-exfoliator.jpg",
        stock: 35,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "7",
        slug: "overnight-lip-mask",
        name: "Overnight Honey Lip Mask",
        description: "Wake up to plump, hydrated lips with our overnight honey lip mask.",
        price: 0,
        category: "lip-mask",
        image_url: "/images/products/lip-mask.jpg",
        stock: 30,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "8",
        slug: "collagen-lip-mask",
        name: "Collagen Boost Lip Mask",
        description: "Intensive lip treatment with collagen peptides.",
        price: 0,
        category: "lip-mask",
        image_url: "/images/products/lip-mask.jpg",
        stock: 25,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "9",
        slug: "lavender-hand-cream",
        name: "Lavender Dreams Hand Cream",
        description: "Luxurious hand cream infused with calming lavender.",
        price: 0,
        category: "hand-cream",
        image_url: "/images/products/hand-cream.jpg",
        stock: 70,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "10",
        slug: "shea-butter-hand-cream",
        name: "Shea Butter Intensive Hand Cream",
        description: "Deep moisturizing hand cream with pure shea butter.",
        price: 0,
        category: "hand-cream",
        image_url: "/images/products/hand-cream.jpg",
        stock: 65,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "11",
        slug: "hydrating-face-mask",
        name: "Hydrating Glow Face Mask",
        description: "Revitalize your skin with hyaluronic acid and vitamin C.",
        price: 0,
        category: "face-mask",
        image_url: "/images/products/face-mask.jpg",
        stock: 40,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "12",
        slug: "charcoal-detox-face-mask",
        name: "Charcoal Detox Face Mask",
        description: "Deep cleansing charcoal mask that draws out impurities.",
        price: 0,
        category: "face-mask",
        image_url: "/images/products/face-mask.jpg",
        stock: 35,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "13",
        slug: "floral-essence-perfume",
        name: "Floral Essence Perfume",
        description: "A delicate blend of rose, jasmine, and peony notes.",
        price: 0,
        category: "perfume",
        image_url: "/images/products/perfume.jpg",
        stock: 20,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "14",
        slug: "vanilla-musk-perfume",
        name: "Vanilla Musk Perfume",
        description: "Warm and sensual fragrance with notes of vanilla and amber.",
        price: 0,
        category: "perfume",
        image_url: "/images/products/perfume.jpg",
        stock: 18,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "15",
        slug: "body-butter",
        name: "Whipped Body Butter",
        description: "Luxuriously rich whipped body butter coming soon!",
        price: 0,
        category: "body-care",
        image_url: "/images/products/hand-cream.jpg",
        stock: 0,
        is_coming_soon: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "16",
        slug: "makeup-setting-spray",
        name: "Dewy Setting Spray",
        description: "Keep your makeup flawless all day - Coming Soon!",
        price: 0,
        category: "makeup",
        image_url: "/images/products/lip-gloss.jpg",
        stock: 0,
        is_coming_soon: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

interface ProductsPageProps {
    searchParams: { category?: string };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
    const selectedCategory = searchParams.category || "all";

    // Filter products by category
    const filteredProducts =
        selectedCategory === "all"
            ? allProducts
            : allProducts.filter((p) => p.category === selectedCategory);

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <section className="bg-gradient-to-r from-pink-100 via-peach-100 to-lavender-100 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="text-sm mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-gold transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium">Products</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Shop All Products
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Discover our complete collection of beauty essentials
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filters */}
                    <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <div className="flex gap-2 min-w-max">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={
                                        cat.slug === "all"
                                            ? "/products"
                                            : `/products?category=${cat.slug}`
                                    }
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        selectedCategory === cat.slug
                                            ? "bg-gold text-white shadow-button"
                                            : "bg-white text-gray-700 hover:bg-pink-100 shadow-soft"
                                    )}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="text-gray-600 mb-6">
                        Showing {filteredProducts.length} product
                        {filteredProducts.length !== 1 ? "s" : ""}
                        {selectedCategory !== "all" && (
                            <span>
                                {" "}
                                in{" "}
                                <span className="font-medium text-gray-900">
                                    {categories.find((c) => c.slug === selectedCategory)?.name}
                                </span>
                            </span>
                        )}
                    </p>

                    {/* Product Grid */}
                    <ProductGrid products={filteredProducts} />
                </div>
            </section>
        </div>
    );
}
