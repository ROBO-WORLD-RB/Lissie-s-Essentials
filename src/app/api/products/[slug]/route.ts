import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const supabase = await createClient();
        const { data: product, error } = await supabase
            .from("products")
            .select("*")
            .eq("slug", params.slug)
            .single();

        if (error || !product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Product API error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
