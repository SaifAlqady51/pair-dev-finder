import { RoomSidebar, Video } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { RoomService } from "@/services";
import type { Session } from "next-auth";

export interface RoomPageProps {
  room: Room;
  session: Session | null;
}

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const room = (await RoomService.fetchRoomById(params.roomId)) as Room;
  const session = await getSession();
  return (
    <SidebarProvider className="min-h-[calc(100vh-110px]">
      <main className="w-full">
        <div className="mt-2 flex justify-center gap-12">
          <Video
            roomId={room!.id}
            userId={session?.user.id!}
            username={session?.user.name!}
          />
        </div>
      </main>
      <RoomSidebar room={room} session={session} />
    </SidebarProvider>
  );
}
