import { cn } from "@/lib/utils";
import Link from "next/link";

export const Signing: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex justify-between items-center gap-5", className)}>
      <Link
        data-cy="header-login-link"
        href="/authentication/login"
        className="text-lg font-medium border border-white rounded-lg px-6 py-1.5 hover:bg-slate-700 "
      >
        Log In
      </Link>

      <Link
        href="/authentication/register/verify-email"
        data-cy="header-register-link"
        className="text-lg font-medium border border-white rounded-lg px-6 py-1.5 hover:bg-slate-700"
      >
        Register
      </Link>
    </div>
  );
};
