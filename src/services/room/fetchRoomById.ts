import { Room } from "@/db/schema";

// Fetch a single room by its ID
export const fetchRoomById = async (id: string): Promise<Room | null> => {
  try {
    // Make the API request to fetch the room by ID
    const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
      method: "GET",
    });

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
};
