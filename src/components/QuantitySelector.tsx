"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
    quantity: number;
    onChange: (quantity: number) => void;
    min?: number;
    max?: number;
    size?: "sm" | "md";
    disabled?: boolean;
}

export function QuantitySelector({
    quantity,
    onChange,
    min = 1,
    max = 99,
    size = "md",
    disabled = false,
}: QuantitySelectorProps) {
    const handleDecrease = () => {
        if (quantity > min) {
            onChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < max) {
            onChange(quantity + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= min && value <= max) {
            onChange(value);
        }
    };

    // Size classes - ensure minimum 44px touch targets on mobile for accessibility
    const sizeClasses = {
        sm: {
            // 36px minimum for sm, but with adequate touch area
            button: "w-9 h-9 sm:w-8 sm:h-8 min-w-[36px] min-h-[36px]",
            input: "w-10 h-8 text-sm",
            wrapper: "gap-0.5 p-0.5",
        },
        md: {
            // 44px meets WCAG touch target guidelines
            button: "w-11 h-11 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px]",
            input: "w-14 h-10 text-base",
            wrapper: "gap-1 p-1",
        },
    };

    const classes = sizeClasses[size];

    return (
        <div
            className={cn("inline-flex items-center bg-gray-100 rounded-lg", classes.wrapper)}
            role="group"
            aria-label="Quantity selector"
        >
            <button
                type="button"
                onClick={handleDecrease}
                disabled={disabled || quantity <= min}
                className={cn(
                    "flex items-center justify-center rounded-md",
                    "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm",
                    "transition-all duration-200",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none",
                    classes.button
                )}
                aria-label="Decrease quantity"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                    />
                </svg>
            </button>

            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
                disabled={disabled}
                className={cn(
                    "bg-transparent text-center font-medium text-gray-900",
                    "focus:outline-none focus:ring-0",
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    classes.input
                )}
                aria-label="Quantity"
            />

            <button
                type="button"
                onClick={handleIncrease}
                disabled={disabled || quantity >= max}
                className={cn(
                    "flex items-center justify-center rounded-md",
                    "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm",
                    "transition-all duration-200",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none",
                    classes.button
                )}
                aria-label="Increase quantity"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
        </div>
    );
}
