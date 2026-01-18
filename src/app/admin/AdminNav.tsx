"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function AdminNav({ userEmail }: { userEmail: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = getSupabaseClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    const links = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/products", label: "Products" },
        { href: "/admin/orders", label: "Orders" },
    ];

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="font-script text-2xl text-gold">Lissie&apos;s</Link>
                        <div className="hidden sm:flex items-center gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-gold text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden sm:inline">{userEmail}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-red-500 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
