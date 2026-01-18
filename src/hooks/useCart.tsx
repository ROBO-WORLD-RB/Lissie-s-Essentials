"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CartItem, Cart } from "@/types";

interface CartContextType {
    cart: Cart;
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "lissies-beauty-cart";

function calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0 });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate cart from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.items && Array.isArray(parsed.items)) {
                    setCart({
                        items: parsed.items,
                        subtotal: calculateSubtotal(parsed.items),
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        }
        setIsHydrated(true);
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            } catch (error) {
                console.error("Failed to save cart to localStorage:", error);
            }
        }
    }, [cart, isHydrated]);

    const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity: number = 1) => {
        setCart((prev) => {
            const existingIndex = prev.items.findIndex(
                (i) => i.productId === item.productId
            );

            let newItems: CartItem[];
            if (existingIndex >= 0) {
                // Update quantity of existing item
                newItems = prev.items.map((i, idx) =>
                    idx === existingIndex ? { ...i, quantity: i.quantity + quantity } : i
                );
            } else {
                // Add new item
                newItems = [...prev.items, { ...item, quantity }];
            }

            return {
                items: newItems,
                subtotal: calculateSubtotal(newItems),
            };
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setCart((prev) => {
            const newItems = prev.items.filter((i) => i.productId !== productId);
            return {
                items: newItems,
                subtotal: calculateSubtotal(newItems),
            };
        });
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setCart((prev) => {
            const newItems = prev.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
            );
            return {
                items: newItems,
                subtotal: calculateSubtotal(newItems),
            };
        });
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setCart({ items: [], subtotal: 0 });
    }, []);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);
    const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    // Prevent hydration mismatch by not rendering children until hydrated
    if (!isHydrated) {
        return null;
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isCartOpen,
                openCart,
                closeCart,
                toggleCart,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
