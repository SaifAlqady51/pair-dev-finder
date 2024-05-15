import SigningFormWrapper from "@/components/forms/SigningFormWrapper";
import { VerficationCodeForm } from "@/components/forms/VerficationCodeForm";
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
