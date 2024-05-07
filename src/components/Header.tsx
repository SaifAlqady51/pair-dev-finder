"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Header() {
  const session = useSession();
  return (
    <div>
      {session.data ? (
        <Button onClick={() => signOut()}>SignOut</Button>
      ) : (
        <Button onClick={() => signIn("google")}>SignIn</Button>
      )}
    </div>
  );
}
