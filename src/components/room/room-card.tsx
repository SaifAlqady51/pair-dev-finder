"use client";
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
import { KeywordsList } from "./keywords-list";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const RoomCard: React.FC<{ room: Room; onJoinClick: () => void }> = ({
  room,
  onJoinClick,
}) => {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  const router = useRouter();
  const handleJoinRoom = () => {
    if (isSignedIn) {
      router.push(`/rooms/${room.id}`);
    } else {
      onJoinClick();
    }
  };
  return (
    <>
      <Card
        className="group no-border w-full flex flex-col justify-between dark:shadow-dark shadow-lg"
        data-cy="room-card"
      >
        <div className="w-full h-1/2 ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              room.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4qmuiXoOrmp-skck7b7JjHA8Ry4TZyPHkw&s"
            }
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
                <KeywordsList keywords={room.keywords} />
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
          <Button data-cy="join-button" onClick={handleJoinRoom}>
            Join
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
