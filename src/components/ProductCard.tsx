"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem, openCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (product.is_coming_soon) return;

        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            slug: product.slug,
        });
        openCart();
    };

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
            aria-label={`View ${product.name} - ${formatCurrency(product.price)}`}
        >
            <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden bg-peach-100">
                    <Image
                        src={product.image_url || "/images/placeholder-product.jpg"}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Coming Soon badge */}
                    {product.is_coming_soon && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Badge variant="coming-soon" size="md" className="text-white bg-gold">
                                Coming Soon
                            </Badge>
                        </div>
                    )}

                    {/* Quick add button - visible on mobile, hover on desktop */}
                    {!product.is_coming_soon && (
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/30 to-transparent md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                            <Button
                                onClick={handleAddToCart}
                                variant="primary"
                                size="sm"
                                className="w-full touch-target"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add to Cart
                                </span>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <span className="text-xs font-medium text-gold uppercase tracking-wider">
                        {product.category.replace("-", " ")}
                    </span>
                    <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-gold transition-colors line-clamp-2 flex-1">
                        {product.name}
                    </h3>
                    {product.price > 0 && (
                        <p className="mt-2 text-lg font-bold text-gray-900" aria-label={`Price: ${formatCurrency(product.price)}`}>
                            {formatCurrency(product.price)}
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
}

// Skeleton loader for ProductCard
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>
        </div>
    );
}
