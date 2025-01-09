import SigningFormWrapper from "@/components/forms/SigningFormWrapper";
import { ReactNode } from "react";

import { Metadata } from "next";
import { NavigateionProvider } from "@/hooks/useNavigationControl";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <NavigateionProvider>
      <SigningFormWrapper>{children}</SigningFormWrapper>
    </NavigateionProvider>
  );
}
