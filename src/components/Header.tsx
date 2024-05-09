"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const session = useSession();
  return (
    <div className="flex">
      {session.data ? (
        <Button onClick={() => signOut()}>SignOut</Button>
      ) : (
        <Button onClick={() => signIn("google")}>SignIn</Button>
      )}
      <ModeToggle />
    </div>
  );
}
