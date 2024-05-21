"use client";
import { useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";
import Profile from "./header/Profile";
import Signing from "./header/Signing";
import Image from "next/image";
import Icon from "@/public/static/images/icon.png";
import { loadBindings } from "next/dist/build/swc";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <div className="flex justify-between items-center pr-6 pl-2 dark:bg-gray-900 bg-gray-200 fixed top-0 w-full">
      <div>
        <Image src={Icon} alt="Icon" className="w-16 h-16" />
      </div>
      <div className="flex items-center justify-center gap-10">
        <ModeToggle />
        {/* Skeleton for laoding */}
        {status === "loading" ? (
          <div className="flex gap-4">
            <Skeleton className="w-20 h-10 rounded-md " />
            <Skeleton className="w-20 h-10 rounded-md " />
          </div>
        ) : (
          <div>
            {/* show profile or signing buttons */}
            {session ? (
              <Profile
                image={session.user.image || ""}
                name={session.user.name || ""}></Profile>
            ) : (
              <Signing />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
