import { ConfirmCodeForm } from "@/components";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register | Confirm Verfication Code",
};

export default function CodePage() {
  return (
    <Suspense>
      <h1 className="font-semibold text-3xl">Enter verfication code</h1>
      <ConfirmCodeForm />
    </Suspense>
  );
}
