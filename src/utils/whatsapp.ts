import { CartItem } from "@/types";

interface WhatsAppOrderData {
    orderNumber: string;
    customerName: string;
    phone: string;
    campus: string;
    items: CartItem[];
    total: number;
    note?: string;
}

/**
 * Generate the WhatsApp message template for an order
 * @param data - Order data to include in message
 * @returns Formatted message string
 */
export function generateOrderMessage(data: WhatsAppOrderData): string {
    const itemsList = data.items
        .map(
            (item) =>
                `- ${item.quantity} x ${item.name} — GHS ${(item.price * item.quantity).toFixed(2)}`
        )
        .join("\n");

    const message = `Hello Lissie's team! I want to place an order.

Order#: ${data.orderNumber}
Name: ${data.customerName}
Phone: ${data.phone}
Campus/Location: ${data.campus}

Items:
${itemsList}

Total: GHS ${data.total.toFixed(2)}
${data.note ? `\nNote: ${data.note}` : ""}

Please confirm pickup/delivery time. Thanks!`;

    return message;
}

/**
 * Generate a WhatsApp URL with prefilled message
 * @param data - Order data
 * @returns WhatsApp URL with encoded message
 */
export function generateWhatsAppLink(data: WhatsAppOrderData): string {
    const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || "233503099327";
    const message = generateOrderMessage(data);
    const encodedMessage = encodeURIComponent(message);

    // Primary URL format (works best for mobile)
    return `https://wa.me/${storePhone}?text=${encodedMessage}`;
}

/**
 * Generate alternative WhatsApp URL for better mobile compatibility
 * @param data - Order data
 * @returns Alternative WhatsApp API URL
 */
export function generateWhatsAppLinkAlt(data: WhatsAppOrderData): string {
    const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || "233503099327";
    const message = generateOrderMessage(data);
    const encodedMessage = encodeURIComponent(message);

    return `https://api.whatsapp.com/send?phone=${storePhone}&text=${encodedMessage}`;
}

/**
 * Generate a general inquiry WhatsApp link (no order)
 * @returns WhatsApp URL for general inquiries
 */
export function generateInquiryLink(): string {
    const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || "233503099327";
    const message = encodeURIComponent(
        "Hello! I have a question about your products."
    );
    return `https://wa.me/${storePhone}?text=${message}`;
}

/**
 * Generate an order number in format LISSIE-YYYYMMDD-XXX
 * @param counter - Optional counter for the day (default: random 3 digits)
 * @returns Formatted order number
 */
export function generateOrderNumber(counter?: number): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    // If no counter provided, generate a random 3-digit number
    const orderCounter = counter ?? Math.floor(Math.random() * 900) + 100;
    const counterStr = String(orderCounter).padStart(3, "0");

    return `LISSIE-${dateStr}-${counterStr}`;
}
