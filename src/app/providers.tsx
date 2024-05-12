"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathnameList = pathname.split("/");

  const hideHeader = pathnameList.includes("register");

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {!hideHeader && <Header />}
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
