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

import { createAccountFormFieldsData } from "@/data/createAccountFormFieldsData";
import { useCreateAccountForm } from "@/hooks/useCreateAccountForm";
import { ShowPassword } from "./shared";

export const CreateAccountForm: React.FC = () => {
  const { form, onSubmit, showPassword, setShowPassword, access } =
    useCreateAccountForm();

  if (!access.canAccess) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center"
      >
        {createAccountFormFieldsData.map((formField) => (
          <FormField
            key={formField.fieldName}
            control={form.control}
            name={formField.fieldName as "username" | "password"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium capitalize">
                  {formField.fieldName}
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={formField.placeholder}
                      className="border-2"
                      type={
                        (formField.type === "password" && showPassword) ||
                          formField.type === "text"
                          ? "text"
                          : "password"
                      }
                      aria-invalid={!!form.formState.errors[field.name]}
                      aria-describedby={`${field.name}-error`}
                    />
                  </FormControl>
                  {formField.fieldName === "password" && (
                    <ShowPassword
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  )}
                </div>
                <FormMessage id={`${field.name}-error`} />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full font-semibold">
          Create new account
        </Button>
      </form>
    </Form>
  );
};
