"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/QuantitySelector";

export default function CartPage() {
    const { cart, removeItem, updateQuantity, clearCart } = useCart();

    if (cart.items.length === 0) {
        return (
            <div className="animate-fade-in min-h-[60vh] flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Looks like you haven&apos;t added any beauty essentials to your cart yet.
                        Discover our amazing products!
                    </p>
                    <Link href="/products">
                        <Button variant="primary" size="lg">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <section className="bg-gradient-to-r from-pink-100 via-peach-100 to-lavender-100 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="text-sm mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-gold transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium">Shopping Cart</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} in your cart
                    </p>
                </div>
            </section>

            {/* Cart Content */}
            <section className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="bg-white rounded-2xl p-4 md:p-6 shadow-soft flex gap-4 md:gap-6"
                                >
                                    {/* Product Image */}
                                    <Link
                                        href={`/products/${item.slug}`}
                                        className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-peach-100"
                                    >
                                        <Image
                                            src={item.image_url || "/images/placeholder-product.jpg"}
                                            alt={item.name}
                                            fill
                                            sizes="128px"
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <div className="flex items-start justify-between gap-4">
                                            <Link
                                                href={`/products/${item.slug}`}
                                                className="font-semibold text-gray-900 hover:text-gold transition-colors line-clamp-2"
                                            >
                                                {item.name}
                                            </Link>
                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
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

                                        {item.price > 0 && (
                                            <p className="text-gold font-medium mt-1">
                                                {formatCurrency(item.price)}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                                            <QuantitySelector
                                                quantity={item.quantity}
                                                onChange={(qty) => updateQuantity(item.productId, qty)}
                                                min={1}
                                                max={10}
                                                size="sm"
                                            />
                                            {item.price > 0 && (
                                                <span className="font-bold text-gray-900">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart */}
                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-gray-500 hover:text-red-500 transition-colors underline"
                                >
                                    Clear entire cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">
                                            {formatCurrency(cart.subtotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery</span>
                                        <span className="text-sm text-gray-500">
                                            Calculated at checkout
                                        </span>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {formatCurrency(cart.subtotal)}
                                        </span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="block mt-6">
                                    <Button variant="primary" size="lg" className="w-full">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <Link
                                    href="/products"
                                    className="block text-center mt-4 text-gold hover:text-gold-dark transition-colors text-sm font-medium"
                                >
                                    Continue Shopping
                                </Link>

                                {/* Trust badges */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-center gap-6 text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <svg
                                                className="w-6 h-6 mb-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                            <span className="text-xs">Secure</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <svg
                                                className="w-6 h-6 mb-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                />
                                            </svg>
                                            <span className="text-xs">Fast Delivery</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <svg
                                                className="w-6 h-6 mb-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span className="text-xs">WhatsApp</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
