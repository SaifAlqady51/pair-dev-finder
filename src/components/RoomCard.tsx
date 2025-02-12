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
import { FaGithub } from "react-icons/fa";
import { TagList } from "./TagList";
import { splitTags } from "@/utils/splitTags";

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <Card
      className="w-full flex flex-col justify-between shadow-slate-700 shadow-lg "
      data-cy="room-card"
    >
      <div className="w-full h-1/2 ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={room.image || ""}
          alt="room image"
          className="object-cover w-full h-full rounded-t-md "
        />
      </div>
      <div>
        <CardHeader>
          <CardTitle data-cy="room-name">{room.name}</CardTitle>
          <CardDescription data-cy="room-description">
            {room.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="my-2" data-cy="room-tags">
              <TagList tags={splitTags(room.tags)} />
            </div>
            {room.githubRepo && (
              <Link
                href={room.githubRepo || ""}
                target="_blank"
                className="flex gap-2 items-center"
                data-cy="github-repo-link"
              >
                <FaGithub className="w-5 h-5" />
                {getRepoName(room.githubRepo)}
              </Link>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between">
        <Button data-cy="join-button">
          <Link data-cy="go-to-room-link" href={`rooms/${room.id}`}>
            Join
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
