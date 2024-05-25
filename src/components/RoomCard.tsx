import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { getRepoName } from "@/utils/getRepoName";
import Link from "next/link";
import { FaGithub, FaGithubAlt } from "react-icons/fa";
import { TagList } from "./TagList";
import { splitTags } from "@/utils/splitTags";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="w-full flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="my-2">
              <TagList tags={splitTags(room.tags)} />
            </div>
            {room.githubRepo && (
              <Link
                href={room.githubRepo || ""}
                target="_blank"
                className="flex gap-2 items-center">
                <FaGithub className="w-5 h-5" />
                {getRepoName(room.githubRepo)}
              </Link>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between">
        <Button>
          <Link href={`rooms/${room.id}`}>Join</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
