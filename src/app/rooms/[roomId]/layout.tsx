import { RoomSidebar, UnreadMessagesCounterProvider } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { fetchRoomById } from "@/services";

interface ParamsProps {
  params: {
    roomId: string;
  };
  children: React.ReactNode;
}

export default async function Layout({ params, children }: ParamsProps) {
  const room = (await fetchRoomById(params.roomId)) as Room;
  const session = await getSession();

  return (
    <UnreadMessagesCounterProvider>
      <SidebarProvider className="min-h-[calc(100vh-110px]">
        <main className="w-full">{children}</main>
        <RoomSidebar room={room} session={session} />
      </SidebarProvider>
    </UnreadMessagesCounterProvider>
  );
}
