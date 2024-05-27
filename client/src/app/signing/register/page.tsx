import { FullRegisterForm } from "@/components/forms/FullRegisterForm";
import { Suspense } from "react";

export default function CodePage() {
  return (
    <Suspense>
      <h1 className="font-semibold text-3xl">Continue your registration</h1>
      <FullRegisterForm />
    </Suspense>
  );
}
