"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export function Header() {
    const { itemCount, openCart } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Shop" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-pink-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl md:text-3xl font-script text-gold">
                            Lissie&apos;s
                        </span>
                        <span className="hidden sm:inline text-sm text-gray-600 font-medium">
                            Beauty Essentials
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-gold transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        {/* Search button (placeholder) */}
                        <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gold transition-colors"
                            aria-label="Search products"
                        >
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
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        {/* Cart button */}
                        <button
                            type="button"
                            onClick={openCart}
                            className="relative p-2 text-gray-600 hover:text-gold transition-colors"
                            aria-label={`Shopping cart with ${itemCount} items`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {itemCount > 99 ? "99+" : itemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gold transition-colors"
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-300",
                        isMobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"
                    )}
                >
                    <div className="flex flex-col gap-2 pt-2 border-t border-pink-100">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-pink-100 hover:text-gold rounded-lg transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
