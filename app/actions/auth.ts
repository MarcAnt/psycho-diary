import { redirect } from "next/navigation";
import { FormState, SignupFormSchema } from "../lib/signupSchema";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    user: formData.get("user"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { profile, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10)

  if (!profile) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  if (profile && password === "psycho1") {
    console.log({ profile, password });
    redirect("/");
  }
}
