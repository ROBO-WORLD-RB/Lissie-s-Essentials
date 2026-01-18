"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/QuantitySelector";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem, openCart } = useCart();

    const handleAddToCart = () => {
        addItem(
            {
                productId: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                slug: product.slug,
            },
            quantity
        );
        openCart();
        setQuantity(1);
    };

    return (
        <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={Math.min(10, product.stock)}
                    size="md"
                />
            </div>
            <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                disabled={product.stock === 0}
            >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
        </div>
    );
}
