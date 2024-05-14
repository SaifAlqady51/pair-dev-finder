import SigningFormWrapper from "@/components/SigningFormWrapper";
import { VerficationCodeForm } from "@/components/VerficationCodeForm";

export default function CodePage() {
  return (
    <SigningFormWrapper
      form={<VerficationCodeForm />}
      title="Enter verification code"></SigningFormWrapper>
  );
}
