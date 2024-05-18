"use client";

import { Button } from "@/components/ui/button";
import { IoLogoGoogle } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export function ProviderButtons() {
  return (
    <div>
      <div>
        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-600 dark:text-gray-100">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>
      <div className="w-full flex justify-between gap-12 mt-4">
        {/* Google button */}
        <Button
          className="w-1/2 font-semibold space-x-3"
          onClick={() => signIn("google")}>
          <div>Google</div>
          <IoLogoGoogle className="text-[18px]" />
        </Button>

        {/* Github button */}
        <Button
          className="w-1/2 font-semibold space-x-3 "
          onClick={() => signIn("github")}>
          <div>Github</div>
          <FaGithub className="text-[18px]" />
        </Button>
      </div>
    </div>
  );
}
