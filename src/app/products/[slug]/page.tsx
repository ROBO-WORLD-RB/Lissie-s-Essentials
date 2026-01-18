import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { AddToCartButton } from "./AddToCartButton";

// Sample products (will be replaced with Supabase)
const allProducts: Product[] = [
    {
        id: "1",
        slug: "strawberry-lip-scrub",
        name: "Strawberry Lip Scrub",
        description: "Gently exfoliate and nourish your lips with our sweet strawberry lip scrub. Made with natural sugar crystals and vitamin E to reveal soft, smooth lips. Perfect for preparing your lips before applying lipstick or gloss. Use 2-3 times weekly for best results.",
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
        description: "Indulge in the warm, comforting scent of vanilla while buffing away dry skin. Leaves lips feeling silky and hydrated. Our gentle formula is suitable for all skin types and is perfect for daily use.",
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
        description: "A stunning rose-tinted gloss that adds a beautiful sheen with a hint of color. Non-sticky formula keeps lips moisturized all day. The light rose scent is subtle and elegant. Perfect for everyday wear or special occasions.",
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
        description: "Add a touch of sparkle with our clear shimmer gloss. Perfect worn alone or over your favorite lipstick for an extra glossy finish. Contains fine shimmer particles that catch the light beautifully.",
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
        description: "Define and shape your lips with our creamy nude lip liner. Long-lasting formula prevents feathering and keeps lipstick in place. This versatile shade complements most skin tones and can be used to create fuller-looking lips.",
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
        description: "A gorgeous berry shade that pairs perfectly with our lip glosses. Smooth application and all-day wear. The rich pigment glides on effortlessly and stays put without drying out your lips.",
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
        description: "Wake up to plump, hydrated lips with our overnight honey lip mask. Enriched with shea butter and natural honey extract for intensive overnight repair. Apply before bed and enjoy soft, supple lips in the morning.",
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
        description: "Intensive lip treatment with collagen peptides to plump and smooth fine lines. Use 2-3 times weekly for best results. This powerful formula helps restore elasticity and volume to your lips.",
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
        description: "Luxurious hand cream infused with calming lavender essential oil. Fast-absorbing, non-greasy formula for silky soft hands. Perfect for use after washing hands or before bed for overnight hydration.",
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
        description: "Deep moisturizing hand cream with pure shea butter. Perfect for dry, cracked hands. Provides 24-hour hydration and helps protect against environmental damage. Your hands will feel baby soft!",
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
        description: "Revitalize your skin with our hydrating face mask. Packed with hyaluronic acid and vitamin C for a radiant, dewy glow. Apply for 15-20 minutes, 1-2 times per week for best results. Suitable for all skin types.",
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
        description: "Deep cleansing charcoal mask that draws out impurities and unclogs pores. Leaves skin feeling refreshed and refined. Apply to clean skin, leave for 10-15 minutes, then rinse with warm water.",
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
        description: "A delicate blend of rose, jasmine, and peony notes. Light, feminine fragrance perfect for everyday wear. The elegant bottle makes it a beautiful addition to your vanity. Long-lasting scent that evolves throughout the day.",
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
        description: "Warm and sensual fragrance with notes of vanilla, amber, and sandalwood. Long-lasting scent that lingers beautifully. Perfect for evening wear or when you want to make a lasting impression.",
        price: 0,
        category: "perfume",
        image_url: "/images/products/perfume.jpg",
        stock: 18,
        is_coming_soon: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

function getProductBySlug(slug: string): Product | undefined {
    return allProducts.find((p) => p.slug === slug);
}

function getRelatedProducts(product: Product): Product[] {
    return allProducts
        .filter((p) => p.category === product.category && p.slug !== product.slug && !p.is_coming_soon)
        .slice(0, 4);
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const product = getProductBySlug(params.slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description || "",
            images: [product.image_url || "/images/placeholder-product.jpg"],
        },
    };
}

export default function ProductDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const product = getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = getRelatedProducts(product);

    return (
        <div className="animate-fade-in">
            {/* Breadcrumb */}
            <div className="bg-cream border-b border-pink-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="text-sm" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-gold transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/products" className="hover:text-gold transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link
                                    href={`/products?category=${product.category}`}
                                    className="hover:text-gold transition-colors capitalize"
                                >
                                    {product.category.replace("-", " ")}
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium truncate max-w-[200px]">
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Details */}
            <section className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Product Image */}
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-peach-100 shadow-card">
                            <Image
                                src={product.image_url || "/images/placeholder-product.jpg"}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                            {product.is_coming_soon && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="bg-gold text-white px-6 py-3 rounded-full text-lg font-semibold">
                                        Coming Soon
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gold uppercase tracking-wider">
                                {product.category.replace("-", " ")}
                            </span>

                            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                                {product.name}
                            </h1>

                            {product.price > 0 && (
                                <div className="mt-4">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {formatCurrency(product.price)}
                                    </span>
                                </div>
                            )}

                            <div className="mt-6">
                                <h2 className="sr-only">Product description</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Stock status */}
                            <div className="mt-6">
                                {product.is_coming_soon ? (
                                    <span className="inline-flex items-center gap-2 text-gold font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Coming Soon
                                    </span>
                                ) : product.stock > 0 ? (
                                    <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-red-500 font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Add to Cart */}
                            {!product.is_coming_soon && (
                                <AddToCartButton product={product} />
                            )}

                            {/* Features */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-4">Why You&apos;ll Love It</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Premium quality ingredients",
                                        "Cruelty-free & eco-friendly",
                                        "Fast delivery to your campus",
                                        "Easy WhatsApp ordering",
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-600">
                                            <span className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-12 bg-white/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            You Might Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relProduct) => (
                                <Link
                                    key={relProduct.id}
                                    href={`/products/${relProduct.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
                                >
                                    <div className="relative aspect-square bg-peach-100">
                                        <Image
                                            src={relProduct.image_url || "/images/placeholder-product.jpg"}
                                            alt={relProduct.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-gold transition-colors line-clamp-1">
                                            {relProduct.name}
                                        </h3>
                                        {relProduct.price > 0 && (
                                            <p className="mt-1 font-bold text-gray-900">
                                                {formatCurrency(relProduct.price)}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
