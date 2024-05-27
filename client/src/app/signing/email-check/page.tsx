import { EmailRegisterForm } from "@/components/forms/EmailRegisterForm";
import { ProviderButtons } from "@/components/forms/ProvidersButtons";

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-semibold text-3xl">Create new account</h1>
      <EmailRegisterForm />
      <ProviderButtons />
    </>
  );
}
