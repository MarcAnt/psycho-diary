"use client";
import { Box, Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import ChangeTheme from "./ChangeTheme";
import Logout from "./Logout";

type Props = {
  userType: "patient" | "psychologist" | null;
};

const Header = ({ userType }: Props) => {
  return (
    <Box
      component="header"
      style={(theme) => ({
        borderBottom: "1px solid",
        borderBottomColor: theme.colors.gray[7],
      })}
      px={20}
    >
      <Flex mt={20} mb={20} align={"center"} justify={"space-between"}>
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
    </Box>
  );
};

export default Header;
