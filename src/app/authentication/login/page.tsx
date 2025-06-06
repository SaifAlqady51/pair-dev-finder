import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components";

export const metadata: Metadata = {
  title: "Login",
};
export default function LoginPage() {
  return (
    <React.Fragment>
      <div className="space-y-3">
        <h1 className="font-semibold text-[1.8rem] md:text-3xl ">
          Log in to your account
        </h1>
        <div className="flex gap-1 text-gray-300 text-sm">
          <p>{"Don't have an account?"}</p>
          <Link
            href="/authentication/register/verify-email/"
            className="text-blue-500"
            data-cy="register-link"
          >
            Register
          </Link>
        </div>
      </div>
      <LoginForm />
    </React.Fragment>
  );
}
