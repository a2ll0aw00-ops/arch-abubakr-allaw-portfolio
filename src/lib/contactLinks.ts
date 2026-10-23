export function toTelHref(phone: string | null | undefined): string | undefined {
  const raw = (phone ?? '').trim();
  const asciiDigits = raw
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - '٠'.charCodeAt(0)))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - '۰'.charCodeAt(0)));
  const digits = asciiDigits.replace(/\D/g, '');
  if (!digits) return undefined;

  const internationalPrefix = /^\+/.test(raw) ? '+' : '';
  return `tel:${internationalPrefix}${digits}`;
}
