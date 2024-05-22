import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Room } from "@/db/schema";
import Link from "next/link";
import { getRooms } from "../data-access/rooms";
import { unstable_noStore } from "next/cache";

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen   p-24">
      <div className="flex justify-between items-center w-full mb-12">
        <h2 className="text-4xl font-medium">Find Dev Rooms</h2>
        <Button className="font-semibold">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      {rooms.map((room: Room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </main>
  );
}
