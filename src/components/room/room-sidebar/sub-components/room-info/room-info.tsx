import { Room } from "@/db/schema";
import Link from "next/link";
import { FaGithubAlt } from "react-icons/fa";
import { getRepoName } from "@/utils";
import { DeleteRoomButton } from "./sub-components/delete-room-button";
import { Session } from "next-auth";
import { KeywordsList } from "@/components/room/keywords-list";

interface RoomInfoProps {
  room: Room;
  session: Session | null;
}
export const RoomInfo: React.FC<RoomInfoProps> = ({ room, session }) => {
  return (
    <div className=" p-4 border md:rounded-md rounded-none border-slate-300  dark:border-none space-y-3 drop-shadow-xl bg-secondary">
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
      {room.userId === session?.user.id && (
        <DeleteRoomButton roomId={room.id} />
      )}
    </div>
  );
};
