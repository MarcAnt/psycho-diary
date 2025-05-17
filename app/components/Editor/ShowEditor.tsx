"use client";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { type Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text";
import ClearControl from "./ClearControl";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  editor?: Editor | null;
}

export const ShowEditor = ({ onChange, value }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        text: false,
      }),
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        onChange("");
        return;
      }
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <>
      <RichTextEditor editor={editor} w={"100%"}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
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
                onChange("");
              }}
            />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
};
export default ShowEditor;
