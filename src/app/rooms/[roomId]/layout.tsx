import { RoomSidebar } from "@/components/room-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { fetchRoomById } from "@/services";
import { getSession } from "next-auth/react";

interface ParamsProps {
  params: {
    roomId: string;
  };
  children: React.ReactNode;
}

export default async function Layout({ params, children }: ParamsProps) {
  const room = await fetchRoomById(params.roomId);
  const session = await getSession();

  return (
    <SidebarProvider className="min-h-[calc(100vh-110px]">
      <main className="w-full">{children}</main>
      <SidebarTrigger className=" top-0 p-2 w-10 h-10 mr-4 mt-4 hover:bg-slate-700 bg-muted  " />
      <RoomSidebar room={room} session={session} />
    </SidebarProvider>
  );
}
