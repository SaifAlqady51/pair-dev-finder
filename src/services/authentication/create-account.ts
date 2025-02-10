import { Users } from "@/db/schema";

export const createAccountService = async (
  userData: Omit<Users, "emailVerified" | "image" | "id">,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      "/api/authentication/register/create-account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    return await response.json();
  } catch (error) {
    return { success: false, message: `${error}` };
  }
};
