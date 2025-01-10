import { checkLoginUser } from "@/app/authentication/login/actions";
import { loginFormSchema } from "@/components/forms/LoginFrom";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    checkLoginUser({ ...values })
      .then(() => signIn("credentials", { ...values }))
      .catch((error) => {
        toast({
          title: "Failed Login",
          description: String(error),
        });
      })
      .finally(() => setIsLoading(false));
  }
  return { form, onSubmit, isLoading };
}
