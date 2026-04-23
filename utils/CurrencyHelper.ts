export class CurrencyHelper {
  static convertToNumber(currencyString: string | null): number {
    if (!currencyString) return 0;

    const cleanString = currencyString.replace("$", "").replace(/,/g, "");

    return parseFloat(cleanString);
  }
}
