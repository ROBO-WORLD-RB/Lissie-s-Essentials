import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#D6B47F",
};

export const metadata: Metadata = {
    title: {
        default: "Lissie's Beauty Essentials | Premium Beauty Products",
        template: "%s | Lissie's Beauty Essentials",
    },
    description:
        "Discover premium beauty products at Lissie's Beauty Essentials. Shop lip scrubs, lip gloss, lip liners, lip masks, hand creams, face masks, and perfumes. Quality beauty for every occasion.",
    keywords: [
        "beauty products",
        "lip scrub",
        "lip gloss",
        "lip liner",
        "lip mask",
        "hand cream",
        "face mask",
        "perfume",
        "makeup",
        "skincare",
        "Ghana beauty",
    ],
    authors: [{ name: "Lissie's Beauty Essentials" }],
    creator: "Lissie's Beauty Essentials",
    openGraph: {
        type: "website",
        locale: "en_GH",
        url: "https://lissies-beauty.vercel.app",
        siteName: "Lissie's Beauty Essentials",
        title: "Lissie's Beauty Essentials | Premium Beauty Products",
        description:
            "Discover premium beauty products. Shop lip care, skincare, and fragrances.",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Lissie's Beauty Essentials",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Lissie's Beauty Essentials",
        description: "Premium beauty products for every occasion",
        images: ["/images/og-image.jpg"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col bg-cream">
                <CartProvider>
                    {/* Skip link for keyboard users */}
                    <a
                        href="#main-content"
                        className="skip-link"
                    >
                        Skip to main content
                    </a>

                    <Header />
                    <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
                        {children}
                    </main>
                    <Footer />
                    <CartSidebar />
                    <WhatsAppButton />
                    <MobileBottomNav />
                </CartProvider>
            </body>
        </html>
    );
}

