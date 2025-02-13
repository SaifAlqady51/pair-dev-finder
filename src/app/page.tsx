import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Room } from "@/db/schema";
import { fetchRooms } from "@/services";
import { RoomCard } from "@/components";

export default async function Home() {
  let rooms: Room[] = [];
  let error: string | null = null;

  try {
    rooms = await fetchRooms();
  } catch (err) {
    console.error("Error fetching rooms:", err);
    error = "Failed to load rooms. Please try again later.";
  }

  return (
    <main className=" w-full min-h-screen flex justify-center items-center ">
      <div className="min-h-screen md:w-10/12 w-full pt-32 px-16">
        <div className="flex md:flex-row gap-6 flex-col justify-between items-center w-full mb-12">
          <h2
            className="md:text-4xl text-3xl font-bold"
            data-cy="find-dev-title"
          >
            Find Dev Rooms
          </h2>
          <Button className="font-semibold md:text-xl text-2xl md:p-6 px-10 py-6">
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>

        <div className="flex justify-center items-center min-h-[30vh]">
          {error ? (
            <p className="text-2xl font-light text-red-500">{error}</p>
          ) : rooms.length > 0 ? (
            <div
              className=" w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8"
              data-cy="room-list"
            >
              {rooms.map((room) => (
                <RoomCard room={room} key={room.id} />
              ))}
            </div>
          ) : (
            <p className="text-2xl font-light" data-cy="no-rooms-message">
              No rooms available
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
