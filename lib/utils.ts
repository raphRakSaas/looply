/**
 * Helpers génériques (format date, etc.)
 */

export function formatDate(date: Date | string, locale = "fr-FR"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string, locale = "fr-FR"): string {
  return new Date(date).toLocaleString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
