import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/data-access/rooms";
import { getRepoName } from "@/utils/getRepoName";
import Link from "next/link";
import { FaGithubAlt } from "react-icons/fa";

interface ParamsProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: ParamsProps) {
  const room = await getRoom(params.roomId);

  const tags = room?.tags.split(",");
  return (
    <div className="mt-16 grid grid-cols-4 h-screen ">
      {/* Video Player */}
      <div className="col-span-3 p-12 ">
        <div className="drop-shadow-lg bg-gray-100 w-full h-[60%] rounded-[20px]"></div>
      </div>
      {/* Panel */}
      <div className="col-span-1 pt-12">
        <div className=" mr-8 p-4 border rounded-[20px] border-gray-300 space-y-3">
          <h3 className="text-center text-xl font-semibold">{room?.name}</h3>
          <p className="text-lg text-gray-400">{room?.description}</p>
          <h4 className="font-medium text-lg">Tags :</h4>
          <div className="flex gap-2 flex-wrap">
            {tags?.map((lang: string) => (
              <Badge key={lang} className="text-base px-6">
                {lang}
              </Badge>
            ))}
          </div>
          <Link
            href={room?.githubRepo || ""}
            target="_blank"
            className="flex gap-2 items-center">
            <FaGithubAlt />
            {getRepoName(room?.githubRepo) || ""}
          </Link>
        </div>
      </div>
    </div>
  );
}
