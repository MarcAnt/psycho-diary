"use client";
import { Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import ChangeTheme from "./ChangeTheme";
import Logout from "./Logout";

type Props = {
  userType: "patient" | "psychologist" | null;
};

const Header = ({ userType }: Props) => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Title order={2} fz={{ base: "lg", md: "md" }}>
        Registro diario
      </Title>
      <Group gap={"md"}>
        {userType ? (
          <Text size="md">
            {userType === "patient" ? "Paciente" : "Psicólogo"}
          </Text>
        ) : null}

        <ChangeTheme />
        {userType ? <Logout /> : null}
      </Group>
    </Flex>
  );
};

export default Header;
