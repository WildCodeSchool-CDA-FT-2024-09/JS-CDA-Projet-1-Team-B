import * as z from "zod";

export const updateUsernameSchema = z
  .object({
    newUsername: z
      .string()
      .trim()
      .min(3, { message: "Minimum 3 caractères" })
      .max(10, { message: "Maximum 10 caractères" })
      .regex(/^[a-zA-Z0-9]*$/),
  });

export type updateUsernameType = z.infer<typeof updateUsernameSchema>;