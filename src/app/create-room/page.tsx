import { CreateRoomForm } from "@/components/CreateRoomForm";

export default function CreateRoomPage() {
  return (
    <div className=" container mx-auto flex flex-col gap-8 mt-24 max-w-[800px] ">
      <h1 className="text-4xl font-semibold ">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
