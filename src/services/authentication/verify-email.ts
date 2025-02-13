import { FormResponseType } from "../../types/formResponse";
type verifyEmailFormType = {
  email: string;
  template: string;
};

export const verifyEmailService = async (
  userData: verifyEmailFormType,
): Promise<FormResponseType> => {
  try {
    const response = await fetch("/api/authentication/register/verify-email", {
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
