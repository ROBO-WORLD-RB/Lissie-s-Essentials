import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function AdminProductsPage() {
    const supabase = await createClient();
    const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link href="/admin/products/new">
                    <Button variant="primary">Add Product</Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{product.name}</div>
                                    <div className="text-sm text-gray-500">{product.slug}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 capitalize">{product.category?.replace("-", " ")}</td>
                                <td className="px-6 py-4 text-gray-900">{formatCurrency(product.price)}</td>
                                <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                <td className="px-6 py-4">
                                    {product.is_coming_soon ? (
                                        <Badge variant="coming-soon">Coming Soon</Badge>
                                    ) : product.stock > 0 ? (
                                        <Badge variant="success">Active</Badge>
                                    ) : (
                                        <Badge variant="error">Out of Stock</Badge>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {(!products || products.length === 0) && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No products yet. Add your first product to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
