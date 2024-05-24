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
import { FaGithubAlt } from "react-icons/fa";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo || ""}
            target="_blank"
            className="flex gap-2 items-center">
            <FaGithubAlt />
            {getRepoName(room.githubRepo)}
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>
          <Link href={`rooms/${room.id}`}>Join</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
