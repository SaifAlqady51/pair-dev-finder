import { z } from "zod";

export const createAccountFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should be at least 3 characters" })
    .max(12, { message: "Username should be at most 12 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export type CreateAccountFormSchema = z.infer<typeof createAccountFormSchema>;
