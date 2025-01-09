import { FullRegisterForm } from "@/components/forms/FullRegisterForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register | Create Account",
};

export default function CodePage() {
  return (
    <Suspense>
      <h1 className="font-semibold text-3xl">Continue your registration</h1>
      <FullRegisterForm />
    </Suspense>
  );
}
