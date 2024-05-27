import { Button } from "../ui/button";
import Link from "next/link";

export default function Signing() {
  return (
    <div className="flex justify-between items-center gap-4">
      <Button variant="ghost">
        <Link href="/signing/login" className="text-lg font-medium">
          Log In
        </Link>
      </Button>

      <Button variant="ghost">
        <Link href="/signing/email-check" className="text-lg font-medium">
          Register
        </Link>
      </Button>
    </div>
  );
}
