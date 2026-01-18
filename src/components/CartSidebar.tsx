"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/QuantitySelector";
import { cn } from "@/lib/utils";

export function CartSidebar() {
    const { cart, isCartOpen, closeCart, removeItem, updateQuantity } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
                    isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={closeCart}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl",
                    "transform transition-transform duration-300 ease-out",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Your Cart ({cart.items.length})
                        </h2>
                        <button
                            onClick={closeCart}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close cart"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Cart items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {cart.items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-12 h-12 text-pink-300"
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
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Your cart is empty
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Discover our beautiful products and add something special!
                                </p>
                                <Button onClick={closeCart} variant="primary">
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {cart.items.map((item) => (
                                    <li
                                        key={item.productId}
                                        className="flex gap-4 p-4 bg-cream rounded-xl"
                                    >
                                        {/* Product image */}
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-peach-100">
                                            <Image
                                                src={item.image_url || "/images/placeholder-product.jpg"}
                                                alt={item.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product info */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/products/${item.slug}`}
                                                onClick={closeCart}
                                                className="font-medium text-gray-900 hover:text-gold transition-colors line-clamp-1"
                                            >
                                                {item.name}
                                            </Link>
                                            {item.price > 0 && (
                                                <p className="text-gold font-semibold mt-1">
                                                    {formatCurrency(item.price)}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between mt-2">
                                                <QuantitySelector
                                                    quantity={item.quantity}
                                                    onChange={(qty) => updateQuantity(item.productId, qty)}
                                                    min={1}
                                                    max={10}
                                                    size="sm"
                                                />
                                                <button
                                                    onClick={() => removeItem(item.productId)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                    aria-label={`Remove ${item.name} from cart`}
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
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer with totals */}
                    {cart.items.length > 0 && (
                        <div className="border-t border-gray-100 px-6 py-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-xl font-bold text-gray-900">
                                    {formatCurrency(cart.subtotal)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Delivery fees calculated at checkout
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/cart" onClick={closeCart}>
                                    <Button variant="outline" className="w-full">
                                        View Cart
                                    </Button>
                                </Link>
                                <Link href="/checkout" onClick={closeCart}>
                                    <Button variant="primary" className="w-full">
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
