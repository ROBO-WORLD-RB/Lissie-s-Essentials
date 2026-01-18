import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Get counts (using mock data if Supabase not configured)
    let productCount = 0;
    let orderCount = 0;
    let pendingOrders = 0;

    try {
        const { count: pCount } = await supabase.from("products").select("*", { count: "exact", head: true });
        const { count: oCount } = await supabase.from("orders").select("*", { count: "exact", head: true });
        const { count: poCount } = await supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending");
        productCount = pCount || 0;
        orderCount = oCount || 0;
        pendingOrders = poCount || 0;
    } catch {
        // Supabase not configured
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-gold">{productCount}</div>
                    <div className="text-gray-600">Total Products</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-gold">{orderCount}</div>
                    <div className="text-gray-600">Total Orders</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-yellow-500">{pendingOrders}</div>
                    <div className="text-gray-600">Pending Orders</div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow"
                >
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">Manage Products</div>
                        <div className="text-sm text-gray-500">Add, edit, or remove products</div>
                    </div>
                </Link>
                <Link
                    href="/admin/orders"
                    className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow"
                >
                    <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">View Orders</div>
                        <div className="text-sm text-gray-500">Manage customer orders</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
