import React from "react";
import DiaryEntries from "../components/DiaryEntries";
import AppInitializer from "../components/AppInitializer";
import { authProfile } from "../utils/authProfile";
import Link from "next/link";
import { Anchor, Flex } from "@mantine/core";

const EntriesPage = async () => {
  const { profile } = await authProfile();

  return (
    <AppInitializer>
      <Flex direction={"column"} w={"100%"} mt={20}>
        <Anchor component={Link} px={"sm"} href={"/"}>
          Inicio
        </Anchor>
        <DiaryEntries profile={profile} />
      </Flex>
    </AppInitializer>
  );
};

export default EntriesPage;
