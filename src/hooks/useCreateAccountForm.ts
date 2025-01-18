import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { decrypt } from "@/utils/jwt";
import { useNavigatControl } from "@/hooks/useNavigationControl";
import { createUserAccount } from "@/app/authentication/register/create-account/actions";
import {
  createAccountFormSchema,
  CreateAccountFormSchema,
} from "@/schemas/creatAccountFormSchema";

export const useCreateAccountForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const access = useNavigatControl();
  const searchParams = useSearchParams();
  const encryptedData = searchParams!.get("data");

  const form = useForm<CreateAccountFormSchema>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: CreateAccountFormSchema) => {
    try {
      // Decrypt and validate email data
      const decryptedData = decrypt(encryptedData || "");
      const data = decryptedData as { email: string; iat: number } | null;

      if (!data?.email) {
        toast({
          title: "Error",
          description: "Invalid or missing email data",
          variant: "destructive",
        });
        return;
      }

      // Create the user account
      const createdAccount = await createUserAccount({
        name: values.username,
        password: values.password,
        email: data.email,
      });

      if (!createdAccount.success) {
        console.error(createdAccount.message);
        toast({
          title: "Error",
          description: "Failed to create account",
          variant: "destructive",
        });
        return;
      }

      // Show success toast with account details
      toast({
        title: "Account Created",
        description: `Created account for successfully `,
      });

      // Sign in the user
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: values.password,
      });

      if (signInResult?.error) {
        toast({
          title: "Error",
          description: signInResult.error,
          variant: "destructive",
        });
        return;
      }

      // Update access and redirect
      access.setCanAccess(false);
      router.push("/");
    } catch (error) {
      // Show error toast
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
