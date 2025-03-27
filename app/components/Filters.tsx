import { Flex, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React from "react";
import { BiCalendar, BiSearch } from "react-icons/bi";

const Filters = () => {
  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"} mb={"sm"}>
      <TextInput
        rightSectionPointerEvents="none"
        rightSection={<BiSearch></BiSearch>}
        label="Buscar entrada"
        placeholder="Titulo, description..."
      />
      <DatePickerInput
        rightSectionPointerEvents="none"
        label="Buscar por fecha"
        placeholder="Fecha de Entrada"
        rightSection={<BiCalendar />}
      ></DatePickerInput>
    </Flex>
  );
};

export default Filters;
