"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const supabase = getSupabaseClient();
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                setError(error.message);
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-peach-100 to-lavender-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-card p-8">
                    <div className="text-center mb-8">
                        <span className="text-3xl font-script text-gold">Lissie&apos;s</span>
                        <h1 className="mt-2 text-2xl font-bold text-gray-900">Admin Login</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@lissies.com"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
