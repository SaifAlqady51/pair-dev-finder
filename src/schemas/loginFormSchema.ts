import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});
export type LoginUserType = { email: string; password: string };
