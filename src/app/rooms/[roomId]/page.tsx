import { TagList } from "@/components";
import { Video } from "@/components";
import { getSession } from "@/lib/auth";
import { fetchRoomById } from "@/services";
import { getRepoName } from "@/utils/getRepoName";
import Link from "next/link";
import { FaGithubAlt } from "react-icons/fa";

interface ParamsProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: ParamsProps) {
  const room = await fetchRoomById(params.roomId);
  const session = await getSession();

  return (
    <div className="mt-2 flex justify-center gap-12 bg-slate-100 dark:bg-slate-950 ">
      {/* Video Player */}
      <Video
        roomId={room!.id}
        userId={session?.user.id!}
        username={session?.user.name!}
      />
      {/* Panel */}
      <div className="xl:flex hidden h-fit pt-4">
        <div className=" mr-8 p-4 border rounded-[20px] border-slate-300  dark:border-none space-y-3 drop-shadow-xl bg-secondary">
          <h3 className="text-center text-2xl font-semibold">{room?.name}</h3>
          <p className="text-lg text-gray-400">{room?.description}</p>
          <h4 className="font-medium text-lg">Tags :</h4>
          <TagList keywords={room?.keywords} />
          <Link
            href={room?.githubRepo || ""}
            target="_blank"
            className="flex gap-2 items-center"
          >
            <FaGithubAlt className="mt-1" />
            {getRepoName(room?.githubRepo) || ""}
          </Link>
        </div>
      </div>
    </div>
  );
}
