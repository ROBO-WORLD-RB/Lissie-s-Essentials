import { formatCurrency, formatCurrencyLocale, parseCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
    it("formats a number as GHS currency", () => {
        expect(formatCurrency(25)).toBe("GHS 25.00");
        expect(formatCurrency(99.99)).toBe("GHS 99.99");
        expect(formatCurrency(0)).toBe("GHS 0.00");
    });

    it("handles decimal precision", () => {
        expect(formatCurrency(25.5)).toBe("GHS 25.50");
        expect(formatCurrency(100.123)).toBe("GHS 100.12");
    });

    it("handles invalid input", () => {
        expect(formatCurrency(NaN)).toBe("GHS 0.00");
        expect(formatCurrency(undefined as unknown as number)).toBe("GHS 0.00");
    });
});

describe("parseCurrency", () => {
    it("parses currency strings to numbers", () => {
        expect(parseCurrency("GHS 25.00")).toBe(25);
        expect(parseCurrency("GHS 99.99")).toBe(99.99);
    });

    it("handles invalid input", () => {
        expect(parseCurrency("")).toBe(0);
        expect(parseCurrency("abc")).toBe(0);
    });
});
