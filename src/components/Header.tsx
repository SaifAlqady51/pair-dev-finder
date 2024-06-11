"use client";
import { useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";
import Profile from "./header/Profile";
import Signing from "./header/Signing";
import Image from "next/image";
import Icon from "@/public/static/images/icon.png";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between items-center pr-6 pl-2 dark:bg-gray-900 bg-slate-500 top-0 w-full z-10">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Icon} alt="Icon" className="w-16 h-16" />
        <h3 className="text-2xl font-semibold">Dev Finder</h3>
      </Link>
      {/* This section get hidden when the screen size is small*/}
      <div className="md:flex items-center justify-center gap-10 hidden ">
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
                name={session.user.name || ""}
              ></Profile>
            ) : (
              <Signing />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
