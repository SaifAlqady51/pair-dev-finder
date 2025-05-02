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

import { LoginFormDataType, loginFormFieldsData } from "@/data/loginformFields";
import React, { useState } from "react";
import { useLoginForm } from "@/hooks/useLoginForm";
import { ProviderButtons, ShowPassword } from "./shared";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, isLoading, onSubmit } = useLoginForm();

  return (
    <React.Fragment>
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
                        data-cy={formField["data-cy"]}
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

                  <FormMessage data-cy="error-message" />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="w-full font-semibold flex items-center justify-center"
            disabled={isLoading}
            data-cy="login-submit-button"
          >
            {isLoading ? <span>Processing...</span> : <span>Log in</span>}
          </Button>
        </form>
      </Form>
      <ProviderButtons />
    </React.Fragment>
  );
}
