import React, { Suspense } from "react";
import DiaryEntries from "../components/DiaryEntries";
import AppInitializer from "../components/AppInitializer";
import { authProfile } from "../utils/authProfile";
import Link from "next/link";
import { Anchor, Flex, Title } from "@mantine/core";

const EntriesPage = async () => {
  const { profile } = await authProfile();

  return (
    <Suspense>
      <Flex
        my={"sm"}
        direction={"column"}
        align={"center"}
        justify={"center"}
        w={"100%"}
      >
        <Anchor component={Link} px={"sm"} href={"/"}>
          Inicio
        </Anchor>
        <Title order={3} my={"md"} px={{ base: "sm" }} ta="center">
          ¡Hola! Bienvenido de nuevo. Estas son las notas.
        </Title>
        <AppInitializer>
          <DiaryEntries profile={profile} />
        </AppInitializer>
      </Flex>
    </Suspense>
  );
};

export default EntriesPage;
