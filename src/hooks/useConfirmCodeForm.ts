import { decrypt } from "@/utils/jwt";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigatControl } from "./useNavigationControl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { confirmCodeFormSchema } from "@/schemas/confirmCodeFormSchema";
import { toast } from "@/components/ui/use-toast";

export function useConfirmCodeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const access = useNavigatControl();
  const route = useRouter();
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof confirmCodeFormSchema>>({
    resolver: zodResolver(confirmCodeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof confirmCodeFormSchema>) {
    setIsLoading(true);
    const realCode = decrypt(searchParams!.get("code") || "") as {
      code: string;
      iat: number;
    };
    if (realCode.code === values.code) {
      access.setCanAccess(true);
      route.push(
        `/authentication/register/create-account?data=${searchParams!.get("data")}`,
      );
    } else {
      toast({
        title: "Error",
        description: "The provided code is incorrect.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return { form, onSubmit, isLoading };
}
