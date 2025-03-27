"use client";
import React from "react";
import {
  ActionIcon,
  Flex,
  Paper,
  Spoiler,
  Stack,
  Text as TextNode,
} from "@mantine/core";
import { Entry } from "../types";
import dayjs from "dayjs";
import { TbTrash } from "react-icons/tb";
import { useEntryStore } from "@/providers/entries-store-provider";
import { generateHTML, useEditor } from "@tiptap/react";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import HardBreak from "@tiptap/extension-hard-break";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";

type EntryProps = Entry;

const DiaryEntry = ({ date, description, title, id }: EntryProps) => {
  const { deleteEntry } = useEntryStore((state) => state);
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
  });

  if (!editor) {
    return null;
  }

  return (
    <Paper shadow="sm" p={"md"} radius="md" withBorder w={"100%"} mb={5}>
      <Spoiler maxHeight={120} showLabel="Mostrar más" hideLabel="Ocultar">
        <Stack>
          <Flex justify={"space-between"} align={"center"}>
            {title ? (
              <TextNode>{title}</TextNode>
            ) : (
              <TextNode>Sin título</TextNode>
            )}

            <Flex align={"center"} gap={"sm"}>
              <ActionIcon
                variant="filled"
                size={"sm"}
                color="red"
                aria-label="Delete"
                onClick={() => deleteEntry(id)}
              >
                <TbTrash />
              </ActionIcon>
              <TextNode fs="italic" size="sm">
                {dayjs(date).format("DD/MM/YYYY HH:mm")}
              </TextNode>
            </Flex>
          </Flex>
          <TextNode
            dangerouslySetInnerHTML={{
              __html: generateHTML(editor!.getJSON(), [
                Document,
                Paragraph,
                Text,
                Bold,
                Heading,
                HardBreak,
                BulletList,
                ListItem,
                OrderedList,
                Italic,
              ]),
            }}
          ></TextNode>
        </Stack>
      </Spoiler>
    </Paper>
  );
};

export default DiaryEntry;
