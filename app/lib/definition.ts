import { z } from "zod";

//psycho1

export const SignupFormSchema = z.object({
  user: z.enum(["psychologist", "patient"]),

  password: z
    .string()
    .min(7, { message: "Be at least 7 characters long" })
    .regex(/[a-z0-9]/, { message: "Contain at least one letter." })
    // .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
  // .regex(/[^a-zA-Z0-9]/, {
  //   message: "Contain at least one special character.",
  // })
  // .trim(),
});

export type SignupForm = z.infer<typeof SignupFormSchema>;

export type FormState =
  | {
      errors?: {
        user?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
