import { Room } from "@/db/schema";
import { Session } from "next-auth";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Chat } from "./sub-components/Chat";
import { RoomInfo } from "./sub-components/room-info/room-info";

interface RoomSidebarProps {
  room: Room;
  session: Session | null;
}

export const RoomSidebar: React.FC<RoomSidebarProps> = ({ room, session }) => {
  return (
    <Sidebar
      variant="sidebar"
      side="right"
      className="xl:flex hidden flex-col mt-20 max-h-100vh"
      bordered={false}
    >
      <SidebarContent className="h-full">
        <RoomInfo room={room} session={session} />
        <div className="flex-1 min-h-0">
          <Chat
            roomId={room!.id}
            username={session?.user.name!}
            userId={session?.user.id!}
          />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
