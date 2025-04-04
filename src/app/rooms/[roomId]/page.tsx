import { Video } from "@/components";
import { getSession } from "@/lib/auth";
import { fetchRoomById } from "@/services";

interface ParamsProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: ParamsProps) {
  const room = await fetchRoomById(params.roomId);
  const session = await getSession();

  return (
    <div className="mt-2 flex justify-center gap-12">
      <Video
        roomId={room!.id}
        userId={session?.user.id!}
        username={session?.user.name!}
      />
    </div>
  );
}
