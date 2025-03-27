"use client";

import React from "react";
import { Box, Button, Checkbox, Flex, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { Entry } from "../types";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link, RichTextEditor } from "@mantine/tiptap";
import TextAlign from "@tiptap/extension-text";
import { useEntryStore } from "@/providers/entries-store-provider";
import { BiCalendar, BiTrash } from "react-icons/bi";

type FormInputs = Omit<Entry, "id"> & {
  isCurrentDay: boolean;
  isSubmitted: boolean;
};

function ClearControl({ handleClear }: { handleClear: () => void }) {
  return (
    <RichTextEditor.Control
      onClick={handleClear}
      aria-label="Clear content"
      title="Clear content"
    >
      <BiTrash size={16} />
    </RichTextEditor.Control>
  );
}

const MainForm = () => {
  const { addEntry } = useEntryStore((state) => state);
  const form = useForm<FormInputs>({
    mode: "uncontrolled",
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
      StarterKit,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: description,
    onUpdate: ({ editor }) => {
      setFieldValue("description", editor.getHTML());
    },
  });

  watch("isCurrentDay", ({ value }) => {
    if (value) {
      setFieldValue("date", new Date());
    }
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        addEntry({
          date: !isCurrentDay ? values.date : new Date(),
          description: values.description,
          title: values.title,
        });
        setFieldValue("description", "");
        editor?.commands.setContent("");
        reset();
      })}
      w={{ base: "100%", md: "70%" }}
      h={"50%"}
      my={20}
      pos={"sticky"}
      top={10}
      left={0}
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
              <RichTextEditor.Blockquote />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
            <ClearControl
              handleClear={() => {
                editor?.commands.setContent("");
                setFieldValue("description", "");
              }}
            />
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>

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

          <Button disabled={!form.isValid()} type="submit" variant="light">
            Guardar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainForm;
