"use client";

import { LoginForm } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthDialogOptions {
  link: string;
}

export const useAuthDialog = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const isAuthenticated = !!session?.user;

  const handleAuthRequired = (options: AuthDialogOptions) => {
    if (isAuthenticated) {
      router.push(options.link);
    } else {
      setIsAuthDialogOpen(true);
    }
  };

  const AuthDialog = () => (
    <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Please sign in to continue
          </DialogTitle>
          <div className="flex gap-1 text-gray-300 text-sm">
            <p>{"Don't have an account?"}</p>
            <Link
              href="/authentication/register/verify-email/"
              className="text-blue-500"
              data-cy="register-link"
            >
              Register
            </Link>
          </div>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );

  return {
    AuthDialog,
    handleAuthRequired,
    isAuthenticated,
  };
};
