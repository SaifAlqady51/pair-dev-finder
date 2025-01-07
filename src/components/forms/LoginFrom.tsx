"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { LoginFormDataType, loginFormFieldsData } from "@/data/loginformFields";
import React, { useState } from "react";
import { ShowPassowrd } from "../ShowPassword";
import { checkLoginUser } from "@/app/signing/login/actions";
import { toast } from "../ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export function LoginForm() {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    checkLoginUser({ ...values })
      .then(() =>
        signIn("credentials", {
          ...values,
        })
      )
      .catch((error) =>
        toast({
          title: "Faild Login",
          description: `${error}`,
        })
      );
  }
  return (
    <React.Fragment>
      <div className="space-y-3">
        <h1 className="font-semibold text-3xl">Log in to your account</h1>
        <div className="flex gap-1 text-gray-300 text-sm">
          <p>Don't have an account?</p>
          <Link href="/signing/email-check/" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center">
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
                      <ShowPassowrd
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                    )}
                  </div>
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full font-semibold">
            Log in
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
