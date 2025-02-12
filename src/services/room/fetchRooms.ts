import { Room } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    // Step 1: Make the API request
    const response = await fetch("http://localhost:3000/api/rooms", {
      method: "GET",
      cache: "no-store",
    });

    // Step 2: Check if the response is OK (status code 200-299)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Failed to fetch rooms: ${response.statusText}`);
      } else if (response.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(`Failed to fetch rooms: ${response.statusText}`);
      }
    }

    // Step 3: Parse the response as JSON
    const data = await response.json();

    // Step 4: Validate the response data and return an empty array if invalid
    if (!Array.isArray(data.data)) {
      console.warn("Invalid data format received. Returning an empty array.");
      return [];
    }

    return data.data as Room[];
  } catch (error) {
    // Step 5: Handle network errors or other unexpected errors
    if (error instanceof Error) {
      console.error("Error in fetchRooms:", error.message);
      return [];
    } else {
      console.error("Unexpected error in fetchRooms:", error);
      return [];
    }
  }
};
