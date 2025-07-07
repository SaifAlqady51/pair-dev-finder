"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Icon from "@/public/static/images/icon.png";
import { Skeleton } from "../ui/skeleton";
import Profile from "./Profile";
import { Signing } from "./Signing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <GiHamburgerMenu className="w-7 h-7" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit border flex justify-center">
          <Signing className="flex-col w-fit justify-center" />
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Signing />
    );
  };

  return (
    <header
      className="flex justify-between items-center  dark:bg-secondary bg-slate-500 top-0 w-full z-10"
      style={{ paddingInline: "var(--page-padding-x)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={Icon}
          alt="Icon"
          className="w-16 h-16"
          width={64}
          height={64}
        />
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
