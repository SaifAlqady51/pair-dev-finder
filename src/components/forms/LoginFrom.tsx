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

import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { LoginFormDataType, loginFormFieldsData } from "@/data/loginformFields";
import { useState } from "react";

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

  const generatedCode = generateRandomNumber();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }
  return (
    <>
      <h1 className="font-semibold text-3xl">Login to your account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center">
          {loginFormFieldsData.map((formField: LoginFormDataType) => (
            <FormField
              key={formField.fieldName}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium capitalize ">
                    {formField.fieldName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JohnDoe@example.com"
                      {...field}
                      className="border-2 "
                      type={
                        (formField.fieldName === "password" && showPassword) ||
                        formField.type === "text"
                          ? "text"
                          : "password"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full font-semibold">
            Create new account
          </Button>
        </form>
      </Form>
    </>
  );
}
