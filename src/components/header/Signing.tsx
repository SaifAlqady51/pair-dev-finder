import { Button } from "../ui/button";
import Link from "next/link";

export default function Signing() {
  return (
    <div className="flex justify-between items-center gap-4">
      <Button>
        <Link href="/signing/login">Log In</Link>
      </Button>

      <Button>
        <Link href="/signing/email-check">Register</Link>
      </Button>
    </div>
  );
}
