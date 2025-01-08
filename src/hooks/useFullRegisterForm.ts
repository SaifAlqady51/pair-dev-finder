import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { decrypt } from "@/utils/jwt";
import { createUserAccount } from "@/app/signing/register/actions";
import { useNavigatControl } from "@/hooks/useNavigationControl";
import {
  FullRegisterFormSchema,
  fullRegisterFormSchema,
} from "@/app/schemas/fullRegisterSchema";

export const useFullRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const access = useNavigatControl();
  const searchParams = useSearchParams();
  const encryptedData = searchParams!.get("data");

  const form = useForm<FullRegisterFormSchema>({
    resolver: zodResolver(fullRegisterFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FullRegisterFormSchema) => {
    try {
      const data = decrypt(encryptedData || "") as {
        email: string;
        iat: number;
      } | null;

      if (!data?.email) {
        throw new Error("Invalid or missing email data");
      }

      await createUserAccount({
        name: values.username,
        password: values.password,
        email: data.email,
      });

      toast({
        title: "Account Created",
        description: `Created account for ${values.username}`,
      });

      const result = await signIn("credentials", {
        email: data.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      access.setCanAccess(false);
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit, showPassword, setShowPassword, access };
};
