import SigningFormWrapper from "@/components/forms/SigningFormWrapper";
import { ReactNode } from "react";

import { NavigateionProvider } from "@/hooks/useNavigationControl";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <NavigateionProvider>
      <SigningFormWrapper>{children}</SigningFormWrapper>
    </NavigateionProvider>
  );
}
