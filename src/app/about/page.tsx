import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Lissie's Beauty Essentials - our story, mission, and commitment to bringing you premium beauty products.",
};

export default function AboutPage() {
    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="bg-gradient-to-br from-pink-100 via-peach-100 to-lavender-100 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Our Story</h1>
                        <p className="mt-6 text-lg text-gray-600">Bringing premium beauty essentials to you with love and care</p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-peach-100 shadow-card">
                            <Image src="/images/about-hero.jpg" alt="Lissie's Beauty Essentials" fill className="object-cover" sizes="50vw" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Lissie&apos;s Beauty Essentials</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>Lissie&apos;s Beauty Essentials was born from a simple passion: helping everyone feel beautiful and confident in their own skin.</p>
                                <p>We carefully curate premium lip care, skincare, and fragrance products that deliver real results. Every product in our collection has been personally tested and approved.</p>
                                <p>Based in Ghana, we&apos;re committed to providing fast, reliable delivery right to your campus or doorstep. Our WhatsApp ordering system makes shopping easy and personal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "✨", title: "Quality First", desc: "Premium ingredients and formulations" },
                            { icon: "💝", title: "Made with Love", desc: "Every product carefully selected" },
                            { icon: "🚀", title: "Fast Delivery", desc: "Quick delivery across Ghana" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-soft">
                                <span className="text-4xl block mb-4">{item.icon}</span>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Glow?</h2>
                    <p className="text-gray-600 mb-8">Discover our collection of beauty essentials</p>
                    <Link href="/products"><Button variant="primary" size="lg">Shop Now</Button></Link>
                </div>
            </section>
        </div>
    );
}
