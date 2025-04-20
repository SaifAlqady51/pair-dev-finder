import { FormResponseType } from "@/types/formResponse";

export async function deleteRoomService({
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
