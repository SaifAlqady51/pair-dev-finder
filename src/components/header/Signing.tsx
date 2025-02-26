import { Button } from "../ui/button";
import Link from "next/link";

export default function Signing() {
  return (
    <div className="flex justify-between items-center gap-4">
      <Button variant="ghost">
        <Link
          data-cy="log-in"
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
          data-cy="register"
        >
          Register
        </Link>
      </Button>
    </div>
  );
}
