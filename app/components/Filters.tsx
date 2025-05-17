import React from "react";
import {
  Button,
  Collapse,
  Flex,
  Group,
  Select,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { BiCalendar, BiSearch } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import { useEntryStore } from "@/providers/entries-store-provider";
import { Profile } from "../types";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  handleFiltered: (valueToFilter: string | Date) => void;
  profile?: Profile;
};

const Filters = ({ handleFiltered }: Props) => {
  const { entries } = useEntryStore((state) => state);
  const [opened, { toggle }] = useDisclosure(false);
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
    <>
      <Group justify="center" mt={5} mb={3}>
        <Button onClick={toggle} rightSection={<CgOptions size={14} />}>
          {opened ? "Ocultar" : "Mostrar"} filtros
        </Button>
      </Group>

      <Collapse in={opened} w={"100%"}>
        <Flex
          w={"100%"}
          justify={"space-between"}
          align={"center"}
          mb={"sm"}
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

          <Flex
            gap={10}
            w={{ base: "100%", md: "auto" }}
            direction={{ base: "column", md: "row" }}
          >
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
          </Flex>
        </Flex>
      </Collapse>
    </>
  );
};

export default Filters;
