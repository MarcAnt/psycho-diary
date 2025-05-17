"use client";
import React, { ComponentPropsWithRef, PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type Profile } from "../types";
import Header from "./Header";

type Props = {
  profile: Profile;
} & PropsWithChildren &
  ComponentPropsWithRef<typeof AppShell>;

const WrapperLayout = ({ children, profile, ...props }: Props) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      {...props}
    >
      <Header userType={profile} opened={opened} toggle={toggle} />
      {children}
    </AppShell>
  );
};

export default WrapperLayout;
