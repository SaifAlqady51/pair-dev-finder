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
import { encrypt } from "@/utils/jwt";

import { render } from "@react-email/render";
import { checkEmail } from "@/app/signing/email-check/actions";
import VerifyEmail from "../../../emails/VerifyEmail";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { useToast } from "../ui/use-toast";
import { describe } from "node:test";

export const registerFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function EmailRegisterForm() {
  const { toast } = useToast();
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const generatedCode = generateRandomNumber();
  const emailHtml = render(<VerifyEmail code={generatedCode.toString()} />);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const token = encrypt(values);
    const encryptedCode = encrypt({ code: generatedCode.toString() });

    checkEmail({ email: values.email, template: emailHtml })
      .then(() => {
        toast({
          title: "Email Sent",
          description: `Verfication code sent to ${values.email}`,
        });
        route.push(`/signing/code?data=${token}&code=${encryptedCode}`);
      })
      .catch((error) => console.log(error));
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
