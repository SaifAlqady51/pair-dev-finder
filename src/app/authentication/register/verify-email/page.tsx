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
        <h1 className="font-semibold text-3xl" data-cy="verify-email-title">
          Create new account
        </h1>
        <div
          className="flex gap-1 text-gray-300 text-sm"
          data-cy="already-have-an-account"
        >
          <p>Already have an account? </p>
          <Link
            href="/authentication/login"
            className="text-blue-500"
            data-cy="login-link"
          >
            Log in
          </Link>
        </div>
      </div>
      <VerifyEmailForm />
      <ProviderButtons />
    </React.Fragment>
  );
}
