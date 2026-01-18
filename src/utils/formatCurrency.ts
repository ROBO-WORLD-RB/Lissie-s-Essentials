/**
 * Format a number as Ghanaian Cedi (GHS) currency
 * @param amount - The amount to format
 * @returns Formatted string like "GHS 25.00"
 */
export function formatCurrency(amount: number): string {
    if (typeof amount !== "number" || isNaN(amount)) {
        return "GHS 0.00";
    }

    return `GHS ${amount.toFixed(2)}`;
}

/**
 * Format a number as currency with locale support
 * @param amount - The amount to format
 * @param currency - Currency code (default: GHS)
 * @param locale - Locale string (default: en-GH)
 * @returns Formatted currency string
 */
export function formatCurrencyLocale(
    amount: number,
    currency: string = "GHS",
    locale: string = "en-GH"
): string {
    if (typeof amount !== "number" || isNaN(amount)) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
        }).format(0);
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(amount);
}

/**
 * Parse a currency string back to number
 * @param currencyString - The formatted currency string
 * @returns The numeric value
 */
export function parseCurrency(currencyString: string): number {
    const cleaned = currencyString.replace(/[^0-9.-]/g, "");
    return parseFloat(cleaned) || 0;
}
