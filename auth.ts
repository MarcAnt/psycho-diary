import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { SignupFormSchema } from "./app/lib/signupSchema";
import { createClient } from "./app/utils/supabase/server";
import bcrypt from "bcrypt";

export class InvalidLoginError extends CredentialsSignin {
  errorMessage: string;
  constructor(message: string, errorOptions?: { [error: string]: string }) {
    super(message, errorOptions);
    this.errorMessage = message;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        profile: {
          label: "Profile",
          type: "select",
          options: [{ value: "patient" }, { value: "psychologist" }],
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new CredentialsSignin("Ingresar tipo de usuario y contraseña");
        }

        if (!credentials.profile || !credentials.password) {
          throw new CredentialsSignin("Tipo de datos inválidos");
        }

        const dataValidation = await SignupFormSchema.safeParseAsync(
          credentials
        );

        if (!dataValidation.success) {
          throw new CredentialsSignin("Tipo de datos inválidos");
        }

        const supabase = await createClient();
        const { profile, password } = dataValidation.data;

        const { error, data: profileData } = await supabase
          .from("profile")
          .select()
          .eq("profile", profile);
        if (error) {
          console.error("Error:", error);
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          profileData[0].password
        );

        if (!passwordsMatch) {
          throw new InvalidLoginError("Contraseña incorrecta");
        }

        if (profileData[0].profile === "patient" && passwordsMatch) {
          return { id: "1", name: "patient", profile };
        }

        if (profileData[0].profile === "psychologist" && passwordsMatch) {
          return { id: "1", name: "psychologist", profile };
        }

        return null;
      },
    }),
  ],
});
