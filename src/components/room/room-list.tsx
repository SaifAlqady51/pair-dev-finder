"use client";

import { Room } from "@/db/schema";
import { RoomService } from "@/services";
import { RoomCard } from "@/components";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useEffect, useState } from "react";
import { RoomCardSkeleton } from "./room-card-skeleton";
import { useAuthDialog } from "@/hooks/use-auth-dialog";

export function RoomsList() {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { AuthDialog, handleAuthRequired } = useAuthDialog();

  useEffect(() => {
    const loadRooms = async () => {
      setIsLoading(true);
      try {
        const { rooms, totalCount } = await RoomService.fetchRooms(
          currentPage,
          pageSize,
        );
        setRooms(rooms);
        setTotalCount(totalCount);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [currentPage]);

  return (
    <>
      <AuthDialog />

      <div className="flex flex-col justify-between min-h-[30vh] w-full">
        {isLoading ? (
          <div className="w-full bg-inherit grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8">
            {Array.from({ length: pageSize }).map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="text-2xl font-light text-red-500">{error}</p>
        ) : rooms.length > 0 ? (
          <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8">
            {rooms.map((room) => (
              <RoomCard room={room} key={room.id} />
            ))}
          </div>
        ) : (
          <p className="text-2xl font-light">No rooms available</p>
        )}
        {!error && !isLoading && rooms.length > 0 && (
          <div className="mt-8">
            <PaginationWithLinks
              page={currentPage}
              onPageChange={(newPage: number) => setCurrentPage(newPage)}
              pageSize={pageSize}
              totalCount={totalCount}
            />
          </div>
        )}
      </div>
    </>
  );
}
