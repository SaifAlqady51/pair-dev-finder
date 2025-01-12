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
import VerifyEmail from "../../../emails/VerifyEmail";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { useToast } from "../ui/use-toast";
import { removeErrorWord } from "@/utils/removeErrorWord";
import { verifyEmail } from "@/app/authentication/register/verify-email/actions";

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
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const token = encrypt(values);
    const encryptedCode = encrypt({ code: generatedCode.toString() });

    const { success, message } = await verifyEmail({
      email: values.email,
      template: emailHtml,
    });

    if (success) {
      toast({
        title: "Email Sent",
        description: `Verification code sent to ${values.email}`,
      });
      route.push(
        `/authentication/register/confirm-code?data=${token}&code=${encryptedCode}`,
      );
    } else {
      toast({
        title: "Failed to send code",
        description: message,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center"
      >
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
