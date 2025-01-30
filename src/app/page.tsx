import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Room } from "@/db/schema";
import { fetchRooms } from "@/services";

export default async function Home() {
  let rooms: Room[] = [];
  let error: string | null = null;

  try {
    rooms = await fetchRooms();
  } catch (err) {
    error = "Failed to load rooms. Please try again later.";
  }

  return (
    <main className="min-h-screen pt-32 px-16">
      <div className="flex justify-between items-center w-full mb-12">
        <h2 className="md:text-4xl text-3xl font-bold" data-cy="find-dev-title">
          Find Dev Rooms
        </h2>
        <Button className="font-semibold text-xl p-6">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="flex justify-center items-center min-h-[30vh]">
        {error ? (
          <p className="text-2xl font-light text-red-500">{error}</p>
        ) : rooms.length > 0 ? (
          <div
            className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
            data-cy="room-list"
          >
            {rooms.map((room) => (
              <RoomCard room={room} key={room.id} />
            ))}
          </div>
        ) : (
          <p className="text-2xl font-light">No rooms available</p>
        )}
      </div>
    </main>
  );
}
