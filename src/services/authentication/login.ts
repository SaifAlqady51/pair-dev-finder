import { LoginUserType } from "@/schemas";
import { FormResponseType } from "@/types/formResponse";

export const loginUser = async (
  userData: LoginUserType,
): Promise<FormResponseType> => {
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
