import React from "react";
import { ProviderButtons } from "@/components/forms/ProvidersButtons";
import Link from "next/link";
import { Metadata } from "next";
import { VerifyEmailForm } from "@/components/forms/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Register | Verify Email",
};

export default function RegisterPage() {
  return (
    <React.Fragment>
      <div className="space-y-3">
        <h1 className="font-semibold text-3xl">Create new account</h1>
        <div className="flex gap-1 text-gray-300 text-sm">
          <p>Already have an account? </p>
          <Link href="/authentication/login/" className="text-blue-500">
            Log in
          </Link>
        </div>
      </div>
      <VerifyEmailForm />
      <ProviderButtons />
    </React.Fragment>
  );
}
