import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/utils/formatCurrency";
import { OrderStatusBadge } from "@/components/ui/Badge";

export default async function AdminOrdersPage() {
    const supabase = await createClient();
    const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false });

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders?.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{order.order_number}</td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900">{order.customer_name}</div>
                                    <div className="text-sm text-gray-500">{order.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{order.campus_location}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(order.total)}</td>
                                <td className="px-6 py-4"><OrderStatusBadge status={order.status} /></td>
                                <td className="px-6 py-4 text-gray-500 text-sm">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {(!orders || orders.length === 0) && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No orders yet. Orders will appear here when customers place them.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
