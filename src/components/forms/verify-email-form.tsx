"use client";
import React from "react";
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
import { useVerifyEmailForm } from "@/hooks/useVerifyEmailForm";
import { generateRandomNumber } from "@/utils";
import { VerifyEmail } from "@emails/VerifyEmail";
import { ProviderButtons } from "./shared";

export const VerifyEmailForm: React.FC = () => {
  const generatedCode = generateRandomNumber();
  const emailHtml = render(<VerifyEmail code={generatedCode.toString()} />);

  const { form, onSubmit, isLoading } = useVerifyEmailForm({
    emailHtml,
    code: generatedCode.toString(),
  });

  return (
    <React.Fragment>
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
                <FormLabel className="font-medium" data-cy="verify-email-input">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="JohnDoe@example.com"
                    {...field}
                    className="border-2 "
                  />
                </FormControl>
                <FormMessage data-cy="veify-email-error-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-semibold flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <span>Create new account</span>
            )}
          </Button>
        </form>
      </Form>
      <ProviderButtons />
    </React.Fragment>
  );
};
