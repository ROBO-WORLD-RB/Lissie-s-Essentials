import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Nude Palette
                pink: {
                    100: "#F7D7DD",
                    200: "#F0C4CC",
                    300: "#E8B0BA",
                },
                peach: {
                    100: "#FBE8E2",
                    200: "#F7D9CF",
                    300: "#F2C9BC",
                },
                lavender: {
                    100: "#E9DFF8",
                    200: "#DDD0F2",
                    300: "#D0C0EB",
                },
                mauve: {
                    100: "#E7CFE8",
                    200: "#DBC0DD",
                    300: "#CFAFD1",
                },
                cream: "#FFF8F6",
                gold: {
                    DEFAULT: "#D6B47F",
                    light: "#E5CCA3",
                    dark: "#C7A165",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                script: ["Pacifico", "cursive"],
            },
            borderRadius: {
                pill: "9999px",
            },
            boxShadow: {
                soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
                card: "0 8px 30px rgba(0, 0, 0, 0.08)",
                button: "0 4px 14px rgba(214, 180, 127, 0.25)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-in-right": "slideInRight 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(100%)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
