"use client";
import { Box, Button, Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import ChangeTheme from "./ChangeTheme";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <Box
      component="header"
      style={(theme) => ({
        borderBottom: "1px solid",
        borderBottomColor: theme.colors.gray[7],
      })}
    >
      <Flex mt={20} mb={20} align={"center"} justify={"space-between"}>
        <Title order={2}>Registro diario</Title>
        <Group gap={"md"}>
          <Text size="md">Marcos</Text>
          <ChangeTheme />
          <Button
            onClick={() => {
              router.push("/login");
            }}
            variant="light"
          >
            Salir
          </Button>
        </Group>
      </Flex>
    </Box>
  );
};

export default Header;
