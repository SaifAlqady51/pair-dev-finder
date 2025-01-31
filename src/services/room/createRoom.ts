// services/roomService.ts

import { Room } from "@/db/schema";

interface CreateRoomResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export async function createRoom(
  data: Omit<Room, "userId" | "id" | "created_at">,
): Promise<CreateRoomResponse> {
  try {
    const response = await fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create room");
    }

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
