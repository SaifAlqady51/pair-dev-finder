import { LoginUserType } from "@/schemas";

export const loginUser = async (
  userData: LoginUserType,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("/api/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    return { success: false, message: `${error}` };
  }
};
