import { EmailRegisterForm } from "@/components/forms/EmailRegisterForm";
import { ProviderButtons } from "@/components/forms/ProvidersButtons";

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-semibold text-3xl">Create new account</h1>
      <EmailRegisterForm />
      <div>
        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-600 dark:text-gray-100">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* Signup with providers section */}
        <ProviderButtons />
      </div>
    </>
  );
}
