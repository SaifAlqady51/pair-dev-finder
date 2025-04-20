"use client";

import { Button } from "@/components/ui/button";
import { deleteRoomService } from "@/services/room/deleteRoom";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteRoomButton: React.FC<{ roomId: string }> = ({ roomId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteRoom = async () => {
    setLoading(true);
    try {
      const response = await deleteRoomService({ id: roomId });
      if (response.success) {
        router.push("/");
        setLoading(false);
      } else {
        console.error("Failed to delete room:", response.message);
      }
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  return (
    <div className="w-full items-end">
      <Button variant="destructive" onClick={deleteRoom} disabled={loading}>
        {loading ? "Deleting..." : "Delete room"}
      </Button>
    </div>
  );
};
