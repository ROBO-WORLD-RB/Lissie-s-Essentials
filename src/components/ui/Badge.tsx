import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "error" | "info" | "coming-soon";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({
    children,
    variant = "default",
    size = "sm",
    className,
}: BadgeProps) {
    const variants = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        error: "bg-red-100 text-red-700",
        info: "bg-lavender-100 text-purple-700",
        "coming-soon": "bg-gold/20 text-gold-dark",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center font-medium rounded-full",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}

export function OrderStatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { variant: BadgeProps["variant"]; label: string }> = {
        pending: { variant: "warning", label: "Pending" },
        preparing: { variant: "info", label: "Preparing" },
        completed: { variant: "success", label: "Completed" },
        cancelled: { variant: "error", label: "Cancelled" },
    };

    const config = statusConfig[status] || { variant: "default", label: status };

    return <Badge variant={config.variant}>{config.label}</Badge>;
}
