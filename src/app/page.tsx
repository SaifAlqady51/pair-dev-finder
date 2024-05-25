import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Room } from "@/db/schema";
import Link from "next/link";
import { getRooms } from "../data-access/rooms";

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen pt-32 px-16">
      <div className="flex justify-between items-center w-full mb-12">
        <h2 className="text-4xl font-medium">Find Dev Rooms</h2>
        <Button className="font-semibold">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6">
        {rooms.map((room: Room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </main>
  );
}
