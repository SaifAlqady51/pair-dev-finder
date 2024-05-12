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
import * as jwt from "jsonwebtoken";
import { encrypt, decrypt } from "@/utils/jwt";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function RegisterForm() {
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = encrypt(values);
    route.push(`/register/code?data=${token}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium ">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="JohnDoe@example.com"
                  {...field}
                  className="border-2 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-semibold">
          Create new account
        </Button>
      </form>
    </Form>
  );
}
