import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { generateOrderNumber, generateWhatsAppLink } from "@/utils/whatsapp";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customerName, phone, campus, note, cartItems, subtotal } = body;

        // Validation
        if (!customerName || !phone || !campus || !cartItems || cartItems.length === 0) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const orderNumber = generateOrderNumber();
        const supabase = createAdminClient();

        // Create order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                order_number: orderNumber,
                customer_name: customerName,
                phone,
                campus_location: campus,
                note: note || null,
                total: subtotal,
                status: "pending",
            })
            .select()
            .single();

        if (orderError) {
            console.error("Order creation error:", orderError);
            return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
        }

        // Create order items
        const orderItems = cartItems.map((item: { productId: string; name: string; price: number; quantity: number }) => ({
            order_id: order.id,
            product_id: item.productId,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
        }));

        const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

        if (itemsError) {
            console.error("Order items error:", itemsError);
        }

        // Generate WhatsApp link
        const waLink = generateWhatsAppLink({
            orderNumber,
            customerName,
            phone,
            campus,
            items: cartItems.map((item: { productId: string; name: string; price: number; quantity: number }) => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image_url: null,
                slug: "",
            })),
            total: subtotal,
            note,
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber,
            waLink,
        });
    } catch (error) {
        console.error("Order API error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
