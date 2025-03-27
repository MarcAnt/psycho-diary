import { redirect } from "next/navigation";
import { FormState, SignupFormSchema } from "../lib/definition";

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
  const { user, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10)

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  if (user && password === "psycho1") {
    console.log({ user, password });
    redirect("/");
  }
}
