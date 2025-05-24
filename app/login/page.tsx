import React from "react";
import Login from "../components/Login";
import { Suspense } from "react";
import { authProfile } from "../utils/authProfile";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { profile } = await authProfile();

  if (profile) {
    redirect("/");
  }

  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
