"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Icon from "@/public/static/images/icon.png";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "../ModeToggle";
import Profile from "./Profile";
import { GiHamburgerMenu } from "react-icons/gi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Signing } from "./Signing";

export function Header() {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between items-center pr-6 pl-2 dark:bg-gray-900 bg-slate-500 top-0 w-full z-10">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Icon} alt="Icon" className="w-16 h-16" />
        <h3 className="text-2xl font-semibold">Dev Finder</h3>
      </Link>
      <div className="flex items-center justify-center md:gap-10 gap-4 ">
        <ModeToggle />
        {/* This section get hidden when the screen size is small*/}
        <div className="md:flex items-center justify-center gap-10 hidden ">
          {/* Skeleton for laoding */}
          {status === "loading" ? (
            <div data-cy="skelatons" className="flex gap-4">
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
        <div className="md:hidden flex">
          <Popover>
            <PopoverTrigger>
              <GiHamburgerMenu className="w-7 h-7" />
            </PopoverTrigger>
            <PopoverContent className="w-fit border shadow-lg dark:shadow-dark ">
              <Signing className="flex-col w-fit" />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
