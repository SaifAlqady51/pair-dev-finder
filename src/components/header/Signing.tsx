import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export const Signing: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex justify-between items-center gap-4", className)}>
      <Button variant="ghost">
        <Link
          data-cy="header-login-link"
          href="/authentication/login"
          className="text-lg font-medium"
        >
          Log In
        </Link>
      </Button>

      <Button variant="ghost">
        <Link
          href="/authentication/register/verify-email"
          className="text-lg font-medium"
          data-cy="header-register-link"
        >
          Register
        </Link>
      </Button>
    </div>
  );
};
