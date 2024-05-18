"use client";

import { useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

import {
  fullRegisterFormFieldsData,
  FullRegisterFormFieldDataType,
} from "@/data/fullRegisterFieldsData";

import { useNavigatControl } from "@/hooks/useNavigationControl";
import { createUserAccount } from "@/app/signing/register/actions";
import { decrypt } from "@/utils/jwt";
import { toast } from "../ui/use-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ShowPassowrd } from "../ShowPassword";
export const fullRegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: " username should be 3 letters at least" })
    .max(12, { message: "username should be 12 max" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 64 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export function FullRegisterForm() {
  const route = useRouter();
  const access = useNavigatControl();
  const searchParams = useSearchParams();
  const encryptedData = searchParams.get("data");

  const [showPassword, setShowPassword] = useState(false);

  if (encryptedData) {
    const data = decrypt(encryptedData);
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof fullRegisterFormSchema>>({
    resolver: zodResolver(fullRegisterFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof fullRegisterFormSchema>) {
    const data = decrypt(searchParams.get("data") || "") as {
      email: string;
      iat: number;
    };
    if (data?.email) {
      createUserAccount({
        name: values.username,
        password: values.password,
        email: data.email,
      })
        .then(() =>
          toast({
            title: "Created Account",
            description: `Created account with name ${values.username} `,
          })
        )
        .catch();
      access.setCanAccess(false);
      route.push("/");
    }
  }
  console.log(access.canAccess);
  if (access.canAccess) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center">
          {/* Loop over fields */}
          {fullRegisterFormFieldsData.map(
            (formField: FullRegisterFormFieldDataType) => (
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
                          type={
                            (formField.type === "password" && showPassword) ||
                            formField.type === "text"
                              ? "text"
                              : "password"
                          }
                        />
                      </FormControl>
                      {/* hide & show password toggler */}
                      {formField.fieldName === "password" && (
                        <ShowPassowrd
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                        />
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
          <Button type="submit" className="w-full font-semibold">
            Create new account
          </Button>
        </form>
      </Form>
    );
  }
}
