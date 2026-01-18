import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Featured products data (will be replaced with Supabase data)
const featuredProducts = [
    {
        id: "1",
        slug: "strawberry-lip-scrub",
        name: "Strawberry Lip Scrub",
        price: 0,
        image_url: "/images/products/lip-scrub.jpg",
        category: "lip-scrub",
    },
    {
        id: "2",
        slug: "rose-petal-lip-gloss",
        name: "Rose Petal Lip Gloss",
        price: 0,
        image_url: "/images/products/lip-gloss.jpg",
        category: "lip-gloss",
    },
    {
        id: "3",
        slug: "overnight-lip-mask",
        name: "Overnight Honey Lip Mask",
        price: 0,
        image_url: "/images/products/lip-mask.jpg",
        category: "lip-mask",
    },
    {
        id: "4",
        slug: "lavender-hand-cream",
        name: "Lavender Dreams Hand Cream",
        price: 0,
        image_url: "/images/products/hand-cream.jpg",
        category: "hand-cream",
    },
    {
        id: "5",
        slug: "hydrating-face-mask",
        name: "Hydrating Glow Face Mask",
        price: 0,
        image_url: "/images/products/face-mask.jpg",
        category: "face-mask",
    },
    {
        id: "6",
        slug: "floral-essence-perfume",
        name: "Floral Essence Perfume",
        price: 0,
        image_url: "/images/products/perfume.jpg",
        category: "perfume",
    },
];

const categories = [
    { slug: "lip-scrub", name: "Lip Scrubs", icon: "💋", color: "bg-pink-100" },
    { slug: "lip-gloss", name: "Lip Gloss", icon: "✨", color: "bg-peach-100" },
    { slug: "lip-liner", name: "Lip Liners", icon: "💄", color: "bg-mauve-100" },
    { slug: "lip-mask", name: "Lip Masks", icon: "🌙", color: "bg-lavender-100" },
    { slug: "hand-cream", name: "Hand Creams", icon: "🤲", color: "bg-pink-100" },
    { slug: "face-mask", name: "Face Masks", icon: "🧖‍♀️", color: "bg-peach-100" },
    { slug: "perfume", name: "Perfumes", icon: "🌸", color: "bg-lavender-100" },
];

export default function HomePage() {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-peach-100 to-lavender-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="text-center lg:text-left">
                            <span className="inline-block px-4 py-1 bg-gold/20 text-gold-dark rounded-full text-sm font-medium mb-4">
                                ✨ New Collection Available
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Enhance Your
                                <span className="block text-gold">Natural Beauty</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                                Discover our curated collection of premium beauty essentials.
                                From luxurious lip care to heavenly fragrances, find everything
                                you need to feel beautiful.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/products">
                                    <Button variant="primary" size="lg">
                                        Shop Now
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg">
                                        Our Story
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative h-[400px] md:h-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-mauve-100/50 to-transparent rounded-3xl" />
                            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-card">
                                <Image
                                    src="/images/hero-beauty.jpg"
                                    alt="Lissie's Beauty Essentials products"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Floating decoration */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                    >
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="#FFF8F6"
                        />
                    </svg>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Shop by Category
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Find exactly what you&apos;re looking for in our carefully curated categories
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/products?category=${category.slug}`}
                                className={`${category.color} rounded-2xl p-6 text-center hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 group`}
                            >
                                <span className="text-4xl block mb-3">{category.icon}</span>
                                <span className="font-medium text-gray-900 group-hover:text-gold transition-colors text-sm">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 md:py-24 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Featured Products
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Our most loved beauty essentials
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="hidden sm:inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors"
                        >
                            View All
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
                            >
                                <div className="relative aspect-square bg-peach-100">
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs font-medium text-gold uppercase tracking-wider">
                                        {product.category.replace("-", " ")}
                                    </span>
                                    <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-gold transition-colors">
                                        {product.name}
                                    </h3>
                                    {product.price > 0 && (
                                        <p className="mt-2 text-lg font-bold text-gray-900">
                                            GHS {product.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link href="/products">
                            <Button variant="outline">View All Products</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Why Choose Lissie&apos;s?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🌿",
                                title: "Quality Ingredients",
                                description:
                                    "We use only the finest ingredients to ensure your beauty products are safe and effective.",
                            },
                            {
                                icon: "💝",
                                title: "Made with Love",
                                description:
                                    "Each product is carefully crafted with attention to detail and a passion for beauty.",
                            },
                            {
                                icon: "📦",
                                title: "Fast Delivery",
                                description:
                                    "Quick and reliable delivery right to your campus or location across Ghana.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 text-center shadow-soft hover:shadow-card transition-all duration-300"
                            >
                                <span className="text-5xl block mb-4">{feature.icon}</span>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-pink-100 via-mauve-100 to-lavender-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Ready to Glow?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Order your favorite beauty essentials now and get them delivered
                        right to you. No payment needed upfront – confirm via WhatsApp!
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products">
                            <Button variant="primary" size="lg">
                                Start Shopping
                            </Button>
                        </Link>
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_PHONE || "2335003099327"}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" size="lg">
                                💬 Chat With Us
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
