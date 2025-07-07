import { CreateRoomForm } from "@/components";

export default function CreateRoomPage() {
  return (
    <div className="container  flex flex-col gap-8 mt-24 max-w-[900px]">
      <h1 className="text-4xl font-semibold" data-cy="create-room-header">
        Create a Room
      </h1>
      <CreateRoomForm />
    </div>
  );
}
