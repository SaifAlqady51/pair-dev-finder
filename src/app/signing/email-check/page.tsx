import React from "react";
import { EmailRegisterForm } from "@/components/forms/EmailRegisterForm";
import { ProviderButtons } from "@/components/forms/ProvidersButtons";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <React.Fragment>
      <div className="space-y-3">
        <h1 className="font-semibold text-3xl">Create new account</h1>
        <div className="flex gap-1 text-gray-300 text-sm">
          <p>Already have an account? </p>
          <Link href="/signing/login/" className="text-blue-500">
            Log in
          </Link>
        </div>
      </div>
      <EmailRegisterForm />
      <ProviderButtons />
    </React.Fragment>
  );
}
