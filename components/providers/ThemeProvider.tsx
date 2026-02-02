"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provider thème : mode clair par défaut, bascule via classe .dark sur html.
 * Utilisé dans le layout racine.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme"
      forcedTheme={undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
