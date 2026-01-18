import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({
    label,
    error,
    helperText,
    className,
    id,
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={cn(
                    "w-full px-4 py-3 rounded-xl border transition-all duration-200",
                    "bg-white text-gray-900 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent",
                    error
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 hover:border-gray-300",
                    className
                )}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                {...props}
            />
            {error && (
                <p id={`${inputId}-error`} className="text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p id={`${inputId}-helper`} className="text-sm text-gray-500">
                    {helperText}
                </p>
            )}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Textarea({
    label,
    error,
    helperText,
    className,
    id,
    ...props
}: TextareaProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={cn(
                    "w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none",
                    "bg-white text-gray-900 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent",
                    error
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 hover:border-gray-300",
                    className
                )}
                rows={4}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                {...props}
            />
            {error && (
                <p id={`${inputId}-error`} className="text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p id={`${inputId}-helper`} className="text-sm text-gray-500">
                    {helperText}
                </p>
            )}
        </div>
    );
}
