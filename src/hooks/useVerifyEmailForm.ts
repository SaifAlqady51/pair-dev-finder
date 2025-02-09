import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { verifyEmailFormSchema } from "@/schemas/verifyEmailFormSchema";
import { encrypt } from "@/utils/jwt";
import { useState } from "react";
import { verifyEmailService } from "@/services";
type UseVerifyEmailFormProps = {
  emailHtml: string;
  code: string;
};
export function useVerifyEmailForm({
  emailHtml,
  code,
}: UseVerifyEmailFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof verifyEmailFormSchema>>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyEmailFormSchema>) => {
    setIsLoading(true);
    const token = encrypt(values);
    const encryptedCode = encrypt({ code: code.toString() });

    const { success, message } = await verifyEmailService({
      email: values.email,
      template: emailHtml,
    });

    if (success) {
      toast({
        title: "Verfication Code Sent",
        description: `Verification code sent to ${values.email}`,
        variant: "success",
      });
      router.push(
        `/authentication/register/confirm-code?data=${token}&code=${encryptedCode}`,
      );
    } else {
      toast({
        title: "Failed to send code",
        description: message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return { form, onSubmit, isLoading };
}
