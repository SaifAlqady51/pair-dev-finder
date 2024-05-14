import SigningFormWrapper from "@/components/SigningFormWrapper";
import { VerficationCodeForm } from "@/components/VerficationCodeForm";
import { Suspense } from "react";

export default function CodePage() {
  return (
    <Suspense>
      <SigningFormWrapper
        form={<VerficationCodeForm />}
        title="Enter verification code"></SigningFormWrapper>
    </Suspense>
  );
}
