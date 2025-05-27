import React from "react";
import Login from "../components/Login";
import { Suspense } from "react";

const LoginPage = async () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
