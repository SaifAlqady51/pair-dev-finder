import { FullRegisterForm } from "@/components/forms/FullRegisterForm";
import SigningFormWrapper from "@/components/forms/SigningFormWrapper";
import { Suspense } from "react";

export default function CodePage() {
  return (
    <Suspense>
      <SigningFormWrapper
        form={<FullRegisterForm />}
        title="Complete your registration"></SigningFormWrapper>
    </Suspense>
  );
}
