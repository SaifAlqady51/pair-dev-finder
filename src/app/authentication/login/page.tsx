import React from "react";
import { LoginForm } from "@/components/forms/LoginFrom";
import { ProviderButtons } from "@/components/forms/ProvidersButtons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
export default function LoginPage() {
  return (
    <React.Fragment>
      <LoginForm />
      <ProviderButtons />
    </React.Fragment>
  );
}
