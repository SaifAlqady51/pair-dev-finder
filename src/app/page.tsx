"use client";
import { Button } from "@/components/ui/button";
import { RoomsList } from "@/components/room/room-list";
import React from "react";
import { useAuthDialog } from "@/hooks/use-auth-dialog";

export default function Home() {
  const { AuthDialog, handleAuthRequired } = useAuthDialog();
  return (
    <>
      <AuthDialog />
      <main className="w-full min-h-screen">
        <div
          className="h-screen w-full pt-32"
          style={{ paddingInline: "var(--page-padding-x)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center w-full mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold">Find Dev Rooms</h2>
            <Button
              className="font-semibold text-xl md:text-2xl px-6 py-4 md:px-8 md:py-6"
              onClick={() => handleAuthRequired({ link: "/create-room" })}
            >
              Create Room
            </Button>
          </div>

          <div className="w-full">
            <RoomsList />
          </div>
        </div>
      </main>
    </>
  );
}
