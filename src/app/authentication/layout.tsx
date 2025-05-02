import { ReactNode } from "react";

import { NavigateionProvider } from "@/hooks/useNavigationControl";
import SigningFormWrapper from "@/components/forms/shared/signing-form-wrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <NavigateionProvider>
      <SigningFormWrapper>{children}</SigningFormWrapper>
    </NavigateionProvider>
  );
}
