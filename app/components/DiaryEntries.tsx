"use client";
import React from "react";
import DiaryEntry from "./DiaryEntry";
import { Flex, Text, Title } from "@mantine/core";
import Filters from "./Filters";
import { useEntryStore } from "@/providers/entries-store-provider";
import Link from "next/link";
import { Anchor } from "@mantine/core";

const DiaryEntries = () => {
  const { entries } = useEntryStore((state) => state);
  if (!entries.length) {
    return (
      <Flex direction={"column"} w={"100%"} px={"sm"} my={20} align={"center"}>
        <Text ta={"center"}>No hay registros</Text>
      </Flex>
    );
  }

  return (
    <Flex direction={"column"} w={"100%"} px={"sm"} my={20} align={"center"}>
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Title order={3}>Registro</Title>
        <Anchor component={Link} href="/entries">
          Entradas
        </Anchor>
      </Flex>
      <Filters />
      {entries
        .slice(0, 5)
        .reverse()
        .map((entry) => {
          return <DiaryEntry key={entry.id} {...entry} />;
        })}
    </Flex>
  );
};

export default DiaryEntries;
