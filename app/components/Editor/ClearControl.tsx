import { RichTextEditor } from "@mantine/tiptap";
import { BiTrash } from "react-icons/bi";

type Props = {
  handleClear: () => void;
};

export default function ClearControl({ handleClear }: Props) {
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
