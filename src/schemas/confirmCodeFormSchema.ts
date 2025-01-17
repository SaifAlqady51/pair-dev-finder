import { z } from "zod";

export const confirmCodeFormSchema = z.object({
  code: z.string().length(6, { message: "should be 6 digits" }),
});
