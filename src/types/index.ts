// Product types
export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    category: string;
    image_url: string | null;
    stock: number;
    is_coming_soon: boolean;
    created_at: string;
    updated_at: string;
}

// Cart types
export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image_url: string | null;
    slug: string;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
}

// Order types
export interface Order {
    id: string;
    order_number: string;
    customer_name: string;
    phone: string;
    campus_location: string | null;
    note: string | null;
    total: number;
    status: OrderStatus;
    created_at: string;
    updated_at: string;
}

export type OrderStatus = "pending" | "preparing" | "completed" | "cancelled";

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string | null;
    product_name: string;
    price: number;
    quantity: number;
    created_at: string;
}

export interface OrderWithItems extends Order {
    order_items: OrderItem[];
}

// API request/response types
export interface CreateOrderRequest {
    customerName: string;
    phone: string;
    campus: string;
    note?: string;
    cartItems: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    subtotal: number;
}

export interface CreateOrderResponse {
    success: boolean;
    orderId: string;
    orderNumber: string;
    waLink: string;
    error?: string;
}

// Category type
export interface Category {
    slug: string;
    name: string;
    description: string;
}

// Pagination
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
