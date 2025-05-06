import { Room } from "@/db/schema";
import { FormResponseType } from "@/types/formResponse";

export class RoomService {
  static async createRoomService(
    data: Omit<Room, "userId" | "id" | "created_at">,
  ): Promise<FormResponseType> {
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

  static async deleteRoomService({
    id,
  }: {
    id: string;
  }): Promise<FormResponseType> {
    try {
      const response = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete room");
      }

      return await response.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  static async fetchRoomById(id: string): Promise<Room | null> {
    try {
      // Make the API request to fetch the room by ID
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/rooms/${id}`,
        {
          method: "GET",
        },
      );

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("Room not found.");
          return null;
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Failed to fetch room: ${response.statusText}`);
        }
      }

      // Parse the response as JSON
      const data = await response.json();

      // Validate the response data
      if (data.success && data.data) {
        return data.data as Room;
      } else {
        console.warn("Invalid data format received.");
        return null;
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      if (error instanceof Error) {
        console.error("Error in fetchRoomById:", error.message);
        return null;
      } else {
        console.error("Unexpected error in fetchRoomById:", error);
        return null;
      }
    }
  }

  static async fetchRooms(
    page: number = 1,
    limit: number = 9,
  ): Promise<{ rooms: Room[]; totalCount: number }> {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/rooms/?page=${page}&limit=${limit}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Failed to fetch rooms: ${response.statusText}`);
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Failed to fetch rooms: ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log("DATA " + JSON.stringify(data));

      if (!Array.isArray(data.data)) {
        console.warn("Invalid data format received. Returning an empty array.");
        return { rooms: [], totalCount: 0 };
      }

      return {
        rooms: data.data as Room[],
        totalCount: data.totalCount as number,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in fetchRooms:", error.message);
        return { rooms: [], totalCount: 0 };
      } else {
        console.error("Unexpected error in fetchRooms:", error);
        return { rooms: [], totalCount: 0 };
      }
    }
  }
}
