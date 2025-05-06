"use client";
import React, { ReactNode, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Modal,
  Paper,
  Spoiler,
  Stack,
  Text as TextNode,
} from "@mantine/core";
import { Entry, Profile } from "../types";
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
import { MdOutlineComment } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import ShowComment from "./ShowComment";
import ShowEditor from "./Editor/ShowEditor";

type EntryProps = Entry & { profile: Profile };

const ShowTitle = ({ children }: { children: ReactNode }) => {
  return children ? (
    <TextNode p={0} m={0} c="dimmed">
      {children}
    </TextNode>
  ) : (
    <TextNode p={0} m={0}>
      Sin título
    </TextNode>
  );
};

const DiaryEntry = ({
  description,
  id,
  profile,
  title,
  comments,
}: EntryProps) => {
  const { deleteEntry, addComment, deleteComment } = useEntryStore(
    (state) => state
  );

  const [comment, setComment] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const handleCreateComment = async () => {
    addComment(comment, id);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          comments?.length ? (
            <TextNode>Agregar comentario - {title}</TextNode>
          ) : (
            <TextNode>Comentario - {title}</TextNode>
          )
        }
        centered
      >
        {comments?.length ? (
          <ShowComment {...comments[0]} />
        ) : (
          <Flex
            justify={"space-between"}
            direction={"column"}
            align={"center"}
            w={"100%"}
          >
            <ShowEditor
              onChange={(value) => {
                if (!value) {
                  return;
                }
                setComment(value);
              }}
              value={comment}
              // editor={editor}
            />

            <Button
              fullWidth
              disabled={!comment}
              onClick={() => handleCreateComment()}
              type="button"
              mt={10}
            >
              Agregar
            </Button>
          </Flex>
        )}
      </Modal>
      <Paper
        shadow="sm"
        p={"md"}
        radius="md"
        withBorder
        w={"100%"}
        mb={10}
        style={() => {
          return {
            backgroundColor:
              profile === "patient"
                ? "rgba(25, 113, 194, 0.06)"
                : "rgba(25, 113, 194, 0.1)",
          };
        }}
      >
        <Spoiler maxHeight={120} showLabel="Mostrar más" hideLabel="Ocultar">
          <Stack gap={0}>
            <Flex align={"center"} columnGap={10} mb={5}>
              {profile === "patient" && (
                <>
                  {comments?.length ? (
                    <Button
                      variant="filled"
                      size={"xs"}
                      aria-label="see-comment"
                      leftSection={<MdOutlineComment />}
                      onClick={open}
                      title="Ver comentario"
                    >
                      Ver comentario
                    </Button>
                  ) : null}

                  <ActionIcon
                    variant="filled"
                    size={"sm"}
                    color="red"
                    aria-label="Delete"
                    onClick={() => deleteEntry(id)}
                    title="Eliminar entrada"
                  >
                    <TbTrash />
                  </ActionIcon>
                </>
              )}
            </Flex>

            <ShowTitle>{title}</ShowTitle>

            <Box
              m={0}
              p={0}
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
            ></Box>
          </Stack>
        </Spoiler>
        {profile === "psychologist" ? (
          <Flex mt={20} justify={"space-between"} align={"center"}>
            {comments?.length ? (
              <>
                <Button disabled={!!comments[0].comment} onClick={open}>
                  Comentar
                </Button>

                <Flex align={"center"} columnGap={10}>
                  <ActionIcon
                    variant="filled"
                    size={"sm"}
                    color="red"
                    aria-label="Delete"
                    onClick={() => deleteComment(comments[0].id)}
                    title="Eliminar comentario"
                  >
                    <TbTrash />
                  </ActionIcon>
                  <Button onClick={open}>Ver Comentario</Button>
                </Flex>
              </>
            ) : (
              <Button onClick={open}>Comentar</Button>
            )}
          </Flex>
        ) : null}
      </Paper>
    </>
  );
};

export default DiaryEntry;
