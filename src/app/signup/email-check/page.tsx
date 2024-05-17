import { EmailRegisterForm } from "@/components/forms/EmailRegisterForm";
import { Button } from "@/components/ui/button";
import { IoLogoGoogle } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

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
        <div className="w-full flex justify-between gap-12 mt-4">
          {/* Google button */}
          <Button className="w-1/2 font-semibold space-x-3">
            <div>Google</div>
            <IoLogoGoogle className="text-[18px]" />
          </Button>

          {/* Github button */}
          <Button className="w-1/2 font-semibold space-x-3 ">
            <div>Github</div>
            <FaGithub className="text-[18px]" />
          </Button>
        </div>
      </div>
    </>
  );
}
