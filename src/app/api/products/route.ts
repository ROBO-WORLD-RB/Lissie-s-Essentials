import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = (page - 1) * limit;

        const supabase = await createClient();

        let query = supabase
            .from("products")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false });

        if (category && category !== "all") {
            query = query.eq("category", category);
        }

        const { data: products, error, count } = await query.range(offset, offset + limit - 1);

        if (error) {
            console.error("Products fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
        }

        return NextResponse.json({
            data: products || [],
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit),
        });
    } catch (error) {
        console.error("Products API error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
