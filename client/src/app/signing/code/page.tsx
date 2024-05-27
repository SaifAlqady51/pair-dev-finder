import SigningFormWrapper from "@/components/forms/SigningFormWrapper";
import { VerficationCodeForm } from "@/components/forms/VerficationCodeForm";
import { Suspense } from "react";

export default function CodePage() {
  return (
    <Suspense>
      <h1 className="font-semibold text-3xl">Enter verfication code</h1>
      <VerficationCodeForm />
    </Suspense>
  );
}
