"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Icon from "@/public/static/images/icon.png";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "../ModeToggle";
import Profile from "./Profile";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Signing } from "./Signing";

export function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const user = session?.user;

  // Authentication Content
  const renderAuthContent = (isMobile = false) => {
    if (isLoading) {
      return (
        <Skeleton
          className={
            isMobile
              ? "w-10 h-10 rounded-md"
              : "flex gap-4 w-20 h-10 rounded-md"
          }
        />
      );
    }
    if (user) {
      return (
        <Profile
          image={user.image || ""}
          name={user.name || ""}
          showName={!isMobile}
        />
      );
    }
    return isMobile ? (
      <Popover>
        <PopoverTrigger>
          <GiHamburgerMenu className="w-7 h-7" />
        </PopoverTrigger>
        <PopoverContent className="w-fit border shadow-lg dark:shadow-dark">
          <Signing className="flex-col w-fit" />
        </PopoverContent>
      </Popover>
    ) : (
      <Signing />
    );
  };

  return (
    <header className="flex justify-between items-center md:px-6 px-2 dark:bg-gray-900 bg-slate-500 top-0 w-full z-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={Icon} alt="Icon" className="w-16 h-16" />
        <h3 className="text-2xl font-semibold">Dev Finder</h3>
      </Link>

      <div className="flex items-center md:gap-10 gap-4">
        <ModeToggle />

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-10">
          {renderAuthContent()}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex">{renderAuthContent(true)}</div>
      </div>
    </header>
  );
}
