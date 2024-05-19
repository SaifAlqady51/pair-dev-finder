"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  return (
    <div className="flex">
      {session.data ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <Button>
          <Link href="/signing/email-check">Sign In</Link>
        </Button>
      )}
      <ModeToggle />
    </div>
  );
}
