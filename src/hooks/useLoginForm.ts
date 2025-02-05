import { toast } from "@/components/ui/use-toast";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { loginUser } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);

    const { success, message } = await loginUser(values);

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
