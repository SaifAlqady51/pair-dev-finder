import { Room } from "@/db/schema";

export const fetchRooms = async (
  page: number = 1,
  limit: number = 9,
): Promise<Room[]> => {
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

    if (!Array.isArray(data.data)) {
      console.warn("Invalid data format received. Returning an empty array.");
      return [];
    }

    return data.data as Room[];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in fetchRooms:", error.message);
      return [];
    } else {
      console.error("Unexpected error in fetchRooms:", error);
      return [];
    }
  }
};
