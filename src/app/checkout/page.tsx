"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { generateOrderNumber } from "@/utils/whatsapp";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderDetails, setOrderDetails] = useState<{ orderNumber: string; waLink: string } | null>(null);
    const [form, setForm] = useState({ customerName: "", phone: "", campus: "", note: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.customerName.trim()) newErrors.customerName = "Name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        if (!form.campus.trim()) newErrors.campus = "Location is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || cart.items.length === 0) return;
        setIsSubmitting(true);

        const orderNumber = generateOrderNumber();
        const storePhone = "233503099327";
        const itemsList = cart.items.map((i) => `- ${i.quantity} x ${i.name} — GHS ${(i.price * i.quantity).toFixed(2)}`).join("\n");
        const message = `Hello Lissie's team! I want to place an order.\n\nOrder#: ${orderNumber}\nName: ${form.customerName}\nPhone: ${form.phone}\nCampus/Location: ${form.campus}\n\nItems:\n${itemsList}\n\nTotal: GHS ${cart.subtotal.toFixed(2)}${form.note ? `\n\nNote: ${form.note}` : ""}\n\nPlease confirm pickup/delivery time. Thanks!`;
        const waLink = `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;

        setOrderDetails({ orderNumber, waLink });
        setOrderComplete(true);
        clearCart();
        setIsSubmitting(false);
    };

    if (orderComplete && orderDetails) {
        return (
            <div className="animate-fade-in min-h-[70vh] flex items-center justify-center py-12">
                <div className="max-w-md mx-auto px-4 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Created!</h1>
                    <p className="text-gray-600 mb-2">Your order number is:</p>
                    <p className="text-xl font-bold text-gold mb-6">{orderDetails.orderNumber}</p>
                    <a href={orderDetails.waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-pill transition-colors">
                        Complete Order on WhatsApp
                    </a>
                    <Link href="/products" className="block mt-8 text-gold hover:text-gold-dark transition-colors font-medium">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    if (cart.items.length === 0) {
        return (
            <div className="animate-fade-in min-h-[60vh] flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                    <Link href="/products"><Button variant="primary">Browse Products</Button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <section className="bg-gradient-to-r from-pink-100 to-lavender-100 py-8">
                <div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl font-bold text-gray-900">Checkout</h1></div>
            </section>
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <Input label="Full Name" name="customerName" value={form.customerName} onChange={handleChange} error={errors.customerName} required />
                                <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required />
                                <Input label="Campus / Location" name="campus" value={form.campus} onChange={handleChange} error={errors.campus} required />
                                <Textarea label="Notes (Optional)" name="note" value={form.note} onChange={handleChange} />
                                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>Place Order via WhatsApp</Button>
                            </form>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                {cart.items.map((item) => (
                                    <div key={item.productId} className="flex justify-between text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{formatCurrency(cart.subtotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
