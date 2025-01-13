import { z } from "zod";

export const verifyEmailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
