import { z } from "zod";

export const SignupFormSchema = z.object({
  profile: z.enum(["psychologist", "patient"]),
  password: z
    .string()
    .min(7, { message: "Debe ser de al menos 6 caracteres" })
    .regex(/[a-z0-9]/, { message: "Debe contener al menos caracteres válidos" })
    .trim(),
});

export type SignupForm = z.infer<typeof SignupFormSchema>;

export type FormState =
  | {
      errors?: {
        profile: string[];
        password: string[];
      };
      message?: string;
    }
  | undefined;
