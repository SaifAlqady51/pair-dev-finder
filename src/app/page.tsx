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
      <main className="w-full min-h-screen flex justify-center items-center">
        <div className="min-h-screen md:w-10/12 w-full pt-32 md:px-16 px-6">
          <div className="flex md:flex-row gap-6 flex-col justify-between items-center w-full mb-12">
            <h2
              className="md:text-4xl text-3xl font-bold"
              data-cy="find-dev-title"
            >
              Find Dev Rooms
            </h2>
            <Button
              className="font-semibold md:text-xl text-2xl md:p-6 px-10 py-6"
              onClick={() => handleAuthRequired({ link: "/create-room" })}
            >
              Create Room
            </Button>
          </div>
          <RoomsList />
        </div>
      </main>
    </>
  );
}
