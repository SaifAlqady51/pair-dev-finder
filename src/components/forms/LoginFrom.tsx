"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginFormDataType, loginFormFieldsData } from "@/data/loginformFields";
import React, { useState } from "react";
import { ShowPassword } from "../ShowPassword";
import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, isLoading, onSubmit } = useLoginForm();

  return (
    <React.Fragment>
      <div className="space-y-3">
        <h1 className="font-semibold text-3xl">Log in to your account</h1>
        <div className="flex gap-1 text-gray-300 text-sm">
          <p>{"Don't have an account?"}</p>
          <Link href="/authentication/verify-email/" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center"
        >
          {loginFormFieldsData.map((formField: LoginFormDataType) => (
            <FormField
              key={formField.fieldName}
              control={form.control}
              name={formField.fieldName}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium capitalize ">
                    {formField.fieldName}
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder={formField.placeholder}
                        {...field}
                        className="border-2 "
                        type={
                          (formField.fieldName === "password" &&
                            showPassword) ||
                            formField.type === "text"
                            ? "text"
                            : "password"
                        }
                      />
                    </FormControl>
                    {/* hide & show password toggler */}
                    {formField.fieldName === "password" && (
                      <ShowPassword
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                    )}
                  </div>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="w-full font-semibold flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <span>Processing...</span> : <span>Log in</span>}
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
