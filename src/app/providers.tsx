"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { Header } from "@/components";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith("/authentication");

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!hideHeader && <Header />}
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
