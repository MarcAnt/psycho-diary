"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  Flex,
  Modal,
  Paper,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { Entry } from "../types";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link, RichTextEditor } from "@mantine/tiptap";
import TextAlign from "@tiptap/extension-text";
import { useEntryStore } from "@/providers/entries-store-provider";
import { BiCalendar } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import ClearControl from "./Editor/ClearControl";
import CryptoJS from "crypto-js";

type FormInputs = Omit<Entry, "id" | "comments"> & {
  isCurrentDay: boolean;
  isSubmitted: boolean;
};

const key = process.env.NEXT_PUBLIC_SECRET_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const MainForm = () => {
  const { addEntry } = useEntryStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  const form = useForm<FormInputs>({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      date: new Date(),
      isCurrentDay: true,
      description: "",
      isSubmitted: false,
    },
    validate: {
      title: (value) =>
        value && value.length <= 3
          ? "Debe contener al menos mas de 3 caracteres"
          : null,
      description: isNotEmpty("No debe estar vació"),
    },
  });

  const { getValues, watch, setFieldValue, reset } = form;
  const { isCurrentDay, description } = getValues();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        text: false,
      }),
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: description,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        setFieldValue("description", "");
        return;
      }
      setFieldValue("description", editor.getHTML());
    },
    immediatelyRender: false,
  });

  watch("isCurrentDay", ({ value }) => {
    if (value) {
      setFieldValue("date", new Date());
    }
  });

  const handleSubmit = async (values: FormInputs) => {
    if (!values.title || !values.description) {
      return;
    }

    const { title, description } = values;

    const encryptedTitle = CryptoJS.AES.encrypt(title, keyutf, {
      iv: iv,
    }).toString();

    const encryptedDescription = CryptoJS.AES.encrypt(description, keyutf, {
      iv: iv,
    }).toString();

    addEntry({
      date: !isCurrentDay ? values.date : new Date(),
      description: encryptedDescription,
      title: encryptedTitle,
    });
    setFieldValue("description", "");
    setGeneratedText("");
    editor?.commands.setContent("");
    reset();
  };

  const handleCorrections = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("api/correction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nota: description }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const { sugerencias } = await response.json();

      if (sugerencias) {
        setIsLoading(false);
        setGeneratedText(sugerencias);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        size={"xl"}
        onClose={close}
        radius={"md"}
        title="Texto generado"
      >
        <Text>Puedes copiar el texto que necesites</Text>
        <Paper shadow="xs" withBorder p="xl">
          <Box
            m={0}
            p={0}
            dangerouslySetInnerHTML={{
              __html: generatedText,
            }}
          />
        </Paper>
      </Modal>

      <Drawer
        opened={openedDrawer}
        onClose={closeDrawer}
        title="Agregar entrada nueva"
        offset={8}
        radius="md"
        size={"lg"}
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(handleSubmit)}
          w={"100%"}
          h={"50%"}
          my={20}
          pos={{ lg: "sticky" }}
          top={10}
          left={0}
          p={10}
          style={{
            backgroundColor: "rgba(25, 113, 194, 0.06)",
            borderRadius: theme.radius.md,
          }}
        >
          <Flex direction="column" gap={10}>
            <TextInput
              label="Título"
              placeholder="Título"
              key={form.key("title")}
              {...form.getInputProps("title")}
              mb={10}
            />

            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <ClearControl
                    handleClear={() => {
                      editor?.commands.setContent("");
                      setFieldValue("description", "");
                    }}
                  />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>

            <Button
              rightSection={<BsStars color={"yellow"} />}
              disabled={description === ""}
              type="button"
              variant="gradient"
              onClick={handleCorrections}
              loading={isLoading}
              loaderProps={{ type: "dots" }}
              fullWidth
            >
              Mejorar registro
            </Button>
            {generatedText ? (
              <Button
                fullWidth
                disabled={!description}
                type="button"
                onClick={open}
              >
                Abrir
              </Button>
            ) : null}

            <Flex mt={10} gap={20} direction={"column"}>
              <Checkbox
                key={form.key("isCurrentDay")}
                {...form.getInputProps("isCurrentDay", { type: "checkbox" })}
                label={"Marcar como día actual"}
              />

              <DateTimePicker
                disabled={isCurrentDay}
                label="Fecha y hora específica"
                placeholder="Fecha y hora"
                rightSectionPointerEvents={"none"}
                rightSection={<BiCalendar />}
                key={form.key("date")}
                {...form.getInputProps("date")}
              />

              <Button fullWidth disabled={!form.isValid()} type="submit">
                Guardar
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Drawer>

      <Button variant="gradient" my={"xl"} size="lg" onClick={openDrawer}>
        Agregar entrada
      </Button>
    </>
  );
};

export default MainForm;
