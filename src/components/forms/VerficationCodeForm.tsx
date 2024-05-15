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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { decrypt, encrypt } from "@/utils/jwt";
import { useParams } from "next/navigation";

export const verificationCodeForm = z.object({
  code: z.string().length(6, { message: "should be 6 digits" }),
});

export function VerficationCodeForm() {
  const route = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("code"));
  // 1. Define your form.
  const form = useForm<z.infer<typeof verificationCodeForm>>({
    resolver: zodResolver(verificationCodeForm),
    defaultValues: {
      code: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof verificationCodeForm>) {
    const realCode = decrypt(searchParams.get("code") || "") as {
      code: string;
      iat: number;
    };
    console.log(realCode);
    if (realCode.code === values.code) {
      console.log("true");
    } else {
      console.log("false");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium ">Verification code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-semibold">
          Enter Code
        </Button>
      </form>
    </Form>
  );
}
