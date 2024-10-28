import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .email({ message: "E-mail non conforme" })
    .regex(
      /^([\w-]+(?:\.[\w-]+)*[^.])@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
      { message: "Certains caractères ne sont acceptés." }
    )
    .max(255, { message: "Maximum 255 caractères." }),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){1,}$/, {
      message:
        "Doit comporter une majuscule, une minuscle, un chiffre et aucun espace.",
    })
    .min(12, { message: "Minimum 12 caractères" })
    .max(50, { message: "Maximum 50 caractères" }),
});

export type Schema = z.infer<typeof schema>;
