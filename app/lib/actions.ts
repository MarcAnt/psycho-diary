"use server";
import { InvalidLoginError, signIn } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof InvalidLoginError) {
      switch (error.type) {
        case "CredentialsSignin":
          return error.errorMessage;

        default:
          return "Algo ha salido mal. Por favor, inténtalo de nuevo.";
      }
    }
    throw error;
  }
}
