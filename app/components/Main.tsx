"use client";
import React from "react";
import DiaryEntries from "./DiaryEntries";
import { Divider, Flex } from "@mantine/core";
import MainForm from "./MainForm";
import { Profile } from "../types";

const Main = () => {
  const profile: Profile = "patient";

  return (
    <>
      {profile === "patient" ? (
        <Flex direction={{ base: "column", md: "row" }}>
          <MainForm />
          <Divider my="md" />
          <DiaryEntries />
        </Flex>
      ) : (
        <DiaryEntries />
      )}
    </>
  );
};

export default Main;
