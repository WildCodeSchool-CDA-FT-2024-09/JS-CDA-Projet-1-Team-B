import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .email()
    .regex(
      /^([\w-]+(?:\.[\w-]+)*[^.])@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    )
    .max(255),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){1,}$/)
    .min(12)
    .max(50),
});

export type newUserSchema = z.infer<typeof schema>;
