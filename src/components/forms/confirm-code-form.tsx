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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { useConfirmCodeForm } from "@/hooks/useConfirmCodeForm";

export const ConfirmCodeForm: React.FC = () => {
  const { form, onSubmit, isLoading } = useConfirmCodeForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium ">Verification code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup data-cy="InputOTPGroup">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        data-cy={`InputOTPSlot-${index}`}
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage data-cy="confirm-code-error-message" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-semibold flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <span>Processing...</span> : <span>Confirm Code</span>}
        </Button>
      </form>
    </Form>
  );
};
