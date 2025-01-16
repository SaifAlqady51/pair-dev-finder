import { checkLoginUser } from "@/app/authentication/login/actions";
import { toast } from "@/components/ui/use-toast";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { memo, useState } from "react";
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
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);

    const { success, message } = await checkLoginUser({ ...values });

    if (success) {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
        variant: "success",
      });

      signIn("credentials", { ...values });
    } else {
      toast({
        title: "Failed Login",
        description: message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }
  return { form, onSubmit, isLoading };
}
