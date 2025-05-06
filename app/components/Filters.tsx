import React from "react";
import { Flex, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { BiCalendar, BiSearch } from "react-icons/bi";
import { useEntryStore } from "@/providers/entries-store-provider";
import { Profile } from "../types";

type Props = {
  handleFiltered: (valueToFilter: string | Date) => void;
  profile?: Profile;
};

const Filters = ({ handleFiltered }: Props) => {
  const { entries } = useEntryStore((state) => state);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      return;
    } else {
      handleFiltered(e.target.value);
    }
  };

  const handleDateChange = (e: Date | null) => {
    if (e === null) {
      handleFiltered("");
      return;
    } else {
      const date = new Date(e.toISOString());
      handleFiltered(date);
    }
  };

  const handleSelectChange = (value: string | null) => {
    if (value) {
      handleFiltered(value);
    }
  };

  return (
    <Flex
      w={"100%"}
      justify={"space-between"}
      align={"center"}
      my={"sm"}
      direction={{ base: "column", md: "row" }}
      gap={10}
    >
      <TextInput
        rightSectionPointerEvents="none"
        rightSection={<BiSearch />}
        label="Buscar entrada"
        placeholder="Título, descripción..."
        onChange={handleInfoChange}
        disabled={!entries.length}
        w={{ base: "100%", md: "auto" }}
      />

      <Flex columnGap={10} w={{ base: "100%", md: "auto" }}>
        <Select
          label="Fecha de entrada"
          placeholder="Recientes o Antiguos"
          data={[
            { value: "recent", label: "Recientes" },
            { value: "old", label: "Antiguos" },
          ]}
          name="date"
          id="date"
          onChange={handleSelectChange}
          disabled={!entries.length}
          allowDeselect={false}
        />
        <DatePickerInput
          leftSectionPointerEvents="none"
          valueFormat="DD/MM/YYYY"
          label="Buscar por fecha exacta"
          placeholder="Fecha de Entrada"
          leftSection={<BiCalendar />}
          disabled={!entries.length}
          clearable
          w={{ base: "100%", md: "auto" }}
          onChange={handleDateChange}
        />
      </Flex>
    </Flex>
  );
};

export default Filters;
