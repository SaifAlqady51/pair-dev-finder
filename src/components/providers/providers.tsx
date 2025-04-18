"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Header, ThemeProvider } from "@/components";

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
