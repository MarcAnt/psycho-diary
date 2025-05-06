import React from "react";
import { Flex, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Flex component="footer" my={"xl"} p={10} justify={"space-between"}>
      <Flex gap={10} align={"center"} justify={"center"} w={"100%"}>
        <Text component="span" ta={"center"} fs={"italic"} size="sm">
          © {new Date().getFullYear()}. Todos los derechos reservados.
          Desarrollado por Marcos Esqueda
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
