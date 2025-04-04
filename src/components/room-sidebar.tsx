import { Link } from "lucide-react";
import { FaGithubAlt } from "react-icons/fa";
import { Chat } from "./Chat";
import { Room } from "@/db/schema";
import { getRepoName } from "@/utils";
import { Session } from "next-auth";
import { Sidebar, SidebarContent } from "./ui/sidebar";
import { KeywordsList } from "./KeywordsList";

interface RoomSidebarProps {
  room: Room | null;
  session: Session | null;
}

export const RoomSidebar: React.FC<RoomSidebarProps> = ({ room, session }) => {
  return (
    <Sidebar
      variant="sidebar"
      side="right"
      className=" xl:flex hidden flex-col mt-20 max-h-100vh"
      bordered={false}
    >
      <SidebarContent className="h-full">
        <div className=" p-4 border rounded-[20px] border-slate-300  dark:border-none space-y-3 drop-shadow-xl bg-secondary">
          <h3 className="text-center text-2xl font-semibold">{room?.name}</h3>
          <p className="text-lg text-gray-400">{room?.description}</p>
          {(room?.keywords ?? []).length > 0 && (
            <>
              <h4 className="font-medium text-lg">Keywords :</h4>
              <KeywordsList keywords={room?.keywords} />
            </>
          )}
          {room?.githubRepo && (
            <Link
              href={room?.githubRepo || ""}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <FaGithubAlt className="mt-1" />
              {getRepoName(room?.githubRepo) || ""}
            </Link>
          )}
        </div>
        <div className="flex-1 min-h-0">
          {" "}
          {/* This prevents overflow */}
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
