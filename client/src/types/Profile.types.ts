import * as z from "zod";

export const updateUsernameschema = z
  .object({
    newUsername: z
      .string()
      .trim()
      .min(3, { message: "Minimum 3 caractères" })
      .max(10, { message: "Maximum 10 caractères" })
      .regex(/^[a-zA-Z0-9]*$/),
  });

export type updateUsernameSchema = z.infer<typeof updateUsernameschema>;

export const updateEmailschema = z
  .object({
    newUsername: z
      .string()
      .trim()
      .min(3, { message: "Minimum 3 caractères" })
      .max(10, { message: "Maximum 10 caractères" })
      .regex(/^[a-zA-Z0-9]*$/),
  });

export type updateEmailSchema = z.infer<typeof updateEmailschema>;