"use client";
import React, { useState } from "react";
import DiaryEntry from "./DiaryEntry";
import {
  Anchor,
  Divider,
  Flex,
  Group,
  Pagination,
  Skeleton,
  Text,
  Timeline,
} from "@mantine/core";
import Filters from "./Filters";
import { useEntryStore } from "@/providers/entries-store-provider";
import { usePathname } from "next/navigation";
import useDebounce from "../hooks/useDebounce";
import Link from "next/link";
import ShowDate from "./ShowDate";
import usePaginate from "../hooks/usePaginate";
import { Profile } from "../types";

type Props = {
  profile: Profile;
};

const limit = 6;

const DiaryEntries = ({ profile }: Props) => {
  const { filteredEntries, getTotalEntries, loading } = useEntryStore(
    (state) => state
  );
  const [search, setSearch] = useState<Date | string>("");
  const debounceValue = useDebounce<string | Date>(search, 800);
  const data = filteredEntries(debounceValue);
  const pathname = usePathname();
  const totalEntries = getTotalEntries();
  const isEntriesPage = pathname === "/entries";
  const { startPage, endPage, message, totalPages, page, setPage } =
    usePaginate({
      totalItems: data.length,
      limit,
    });

  const handleShowEntries = () => {
    if (isEntriesPage) {
      return data.reverse().slice(startPage, endPage);
    } else {
      return data.reverse().slice(0, limit - 1);
    }
  };

  return (
    <Flex
      direction={"column"}
      w={{ base: "100%", sm: "80%", lg: "60%" }}
      mx={"auto"}
      px={"sm"}
      justify={"center"}
      align={"center"}
    >
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        {!isEntriesPage && totalEntries > 5 ? (
          <Anchor component={Link} w={"auto"} href="/entries">
            Ver todas las entradas ({totalEntries})
          </Anchor>
        ) : null}
      </Flex>
      <Filters
        handleFiltered={(valueToFilter: string | Date) => {
          setSearch(valueToFilter);
        }}
        profile={profile}
      />

      <Divider my="md" />

      {data.length ? (
        <>
          {isEntriesPage ? (
            <Group justify="flex-end">
              <Text size="sm">{message}</Text>
              <Pagination
                total={totalPages}
                value={page}
                onChange={setPage}
                withPages={false}
              />
            </Group>
          ) : null}

          {loading ? (
            <Flex
              direction={"column"}
              w={"100%"}
              px={"sm"}
              my={20}
              align={"center"}
            >
              <Skeleton height={100} radius={10} />
            </Flex>
          ) : (
            <Timeline
              w={"100%"}
              active={-1}
              bulletSize={24}
              mt={20}
              lineWidth={2}
            >
              {handleShowEntries().map((entry) => {
                return (
                  <Timeline.Item
                    key={entry.id}
                    title={
                      <Flex align={"center"}>
                        <ShowDate date={entry.date} />
                      </Flex>
                    }
                  >
                    <DiaryEntry profile={profile} {...entry} />
                  </Timeline.Item>
                );
              })}
            </Timeline>
          )}
        </>
      ) : (
        <Flex
          direction={"column"}
          w={"100%"}
          px={"sm"}
          my={20}
          align={"center"}
        >
          <Text ta={"center"}>No hay registros</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default DiaryEntries;
