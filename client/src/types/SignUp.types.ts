import * as z from "zod";

export const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Minimum 3 caractères" })
      .max(10, { message: "Maximum 10 caractères" })
      .regex(/^[a-zA-Z0-9]*$/),
    email: z
      .string()
      .trim()
      .email({ message: "E-mail non conforme" })
      .regex(
        /^([\w-]+(?:\.[\w-]+)*[^.])@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        { message: "Certains caractères ne sont acceptés." }
      )
      .max(255, { message: "Maximum 255 caractères." }),
    password: z
      .string()
      .trim()
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){1,}$/, {
        message:
          "Doit comporter une majuscule, une minuscle, un chiffre et aucun espace.",
      })
      .min(12, { message: "Minimum 12 caractères" })
      .max(50, { message: "Maximum 50 caractères" }),
    confirmPassword: z
      .string()
      .trim()
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){1,}$/, {
        message:
          "Doit comporter une majuscule, une minuscle, un chiffre et aucun espace.",
      })
      .min(12, { message: "Minimum 12 caractères" })
      .max(50, { message: "Maximum 50 caractères" }),
  })
  .refine((e) => e.password === e.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export type Schema = z.infer<typeof schema>;
