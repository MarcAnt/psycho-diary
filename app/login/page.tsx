import React from "react";
import Login from "../components/Login";
import { Suspense } from "react";
import { authProfile } from "../utils/authProfile";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { session } = await authProfile();

  if (session?.user.name) {
    redirect("/");
  }

  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
