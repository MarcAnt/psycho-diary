"use client";
import {
  AppShellHeader,
  AppShellNavbar,
  Burger,
  Divider,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import ChangeTheme from "./ChangeTheme";
import Logout from "./Logout";
type Props = {
  userType: "patient" | "psychologist" | null;
  opened?: boolean;
  toggle?: () => void;
};

const Header = ({ userType, opened, toggle }: Props) => {
  return (
    <>
      <AppShellHeader p={"md"}>
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title order={2} fz={{ base: "lg", md: "md" }}>
              Registro diario
            </Title>
            <Group ml="xl" gap={"md"} visibleFrom="sm">
              {userType ? (
                <Text size="md">
                  {userType === "patient" ? "Paciente" : "Psicólogo"}
                </Text>
              ) : null}

              <ChangeTheme />
              {userType ? <Logout /> : null}
            </Group>
          </Group>
        </Group>
      </AppShellHeader>

      <AppShellNavbar p={"md"}>
        {userType ? (
          <Flex justify={"space-between"} gap={10} align={"center"}>
            <Text size="md">Perfil:</Text>
            <Text fs="italic" size="md">
              {userType === "patient" ? "Paciente" : "Psicólogo"}
            </Text>
          </Flex>
        ) : null}
        <Flex justify={"space-between"} mt={5} align={"center"}>
          <Text size="md">Cambiar tema</Text> <ChangeTheme />
        </Flex>
        {userType ? (
          <>
            <Divider my="md" />
            <Logout />
          </>
        ) : null}
      </AppShellNavbar>
    </>
  );
};

export default Header;
