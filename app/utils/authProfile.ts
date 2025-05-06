import { auth } from "@/auth";
import { Profile } from "../types";

export const authProfile = async () => {
  const session = await auth();
  const userType = session?.user?.name;
  const profile: Profile =
    userType === "psychologist" ? "psychologist" : "patient";

  return { profile };
};
