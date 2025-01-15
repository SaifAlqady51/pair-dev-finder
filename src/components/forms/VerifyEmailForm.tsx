"use client";
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

import { render } from "@react-email/render";
import VerifyEmail from "../../../emails/VerifyEmail";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { useVerifyEmailForm } from "@/hooks/useVerifyEmailForm";

export const VerifyEmailForm: React.FC = () => {
  const generatedCode = generateRandomNumber();
  const emailHtml = render(<VerifyEmail code={generatedCode.toString()} />);

  const { form, onSubmit } = useVerifyEmailForm({
    emailHtml,
    code: generatedCode.toString(),
  });

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
};
