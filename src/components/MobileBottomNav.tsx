"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const navItems = [
    {
        href: "/",
        label: "Home",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        href: "/products",
        label: "Shop",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
    {
        href: "#cart",
        label: "Cart",
        isCart: true,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        href: "/contact",
        label: "Contact",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const { openCart, itemCount } = useCart();

    return (
        <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
            {navItems.map((item) => {
                const isActive = !item.isCart && pathname === item.href;

                if (item.isCart) {
                    return (
                        <button
                            key={item.label}
                            type="button"
                            onClick={openCart}
                            className="flex flex-col items-center justify-center gap-1 py-2 px-3 relative touch-target"
                            aria-label={`Open cart with ${itemCount} items`}
                        >
                            <span className="relative">
                                {item.icon}
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {itemCount > 9 ? "9+" : itemCount}
                                    </span>
                                )}
                            </span>
                            <span className="text-xs">{item.label}</span>
                        </button>
                    );
                }

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 py-2 px-3 touch-target transition-colors",
                            isActive ? "text-gold" : "text-gray-600 hover:text-gold"
                        )}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {item.icon}
                        <span className="text-xs">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
