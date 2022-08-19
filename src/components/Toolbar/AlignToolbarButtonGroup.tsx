import { findNode, TEditor, usePlateEditorState } from "@udecode/plate-core";
import { Alignment, KEY_ALIGN, setAlign } from "@udecode/plate-alignment";
import { memo, MouseEvent, MouseEventHandler } from "react";
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
} from "../../icons";
import useEvent from "../../hooks/useEvent";
import ToolbarButton from "./ToolbarButton";

const DEFAULT_ALIGN = "left";

function getAlign(editor: TEditor): Alignment {
  const nodeEntry = findNode(editor, {
    match: { [KEY_ALIGN]: ["left", "center", "right", "justify"] },
  });
  if (nodeEntry) {
    const [node] = nodeEntry;
    if (typeof node === "object") {
      return node[KEY_ALIGN] as Alignment;
    }
  }

  return DEFAULT_ALIGN;
}

interface AlignButtonsProps {
  onMouseDown: MouseEventHandler<HTMLButtonElement>;
  selectedAlign: Alignment;
}

const AlignButtons = memo(function AlignButtons({
  selectedAlign,
  onMouseDown,
}: AlignButtonsProps) {
  return (
    <>
      <ToolbarButton
        value="left"
        selected={selectedAlign === "left"}
        title="Align Left"
        onMouseDown={onMouseDown}
      >
        <FormatAlignLeft />
      </ToolbarButton>
      <ToolbarButton
        value="center"
        selected={selectedAlign === "center"}
        title="Align Center"
        onMouseDown={onMouseDown}
      >
        <FormatAlignCenter />
      </ToolbarButton>
      <ToolbarButton
        value="right"
        selected={selectedAlign === "right"}
        title="Align Right"
        onMouseDown={onMouseDown}
      >
        <FormatAlignRight />
      </ToolbarButton>
      <ToolbarButton
        value="justify"
        selected={selectedAlign === "justify"}
        title="Justify"
        onMouseDown={onMouseDown}
      >
        <FormatAlignJustify />
      </ToolbarButton>
    </>
  );
});

const AlignToolbarButtonGroup = memo(function AlignToolbarButtonGroup() {
  const editor = usePlateEditorState();
  const selectedAlign = editor ? getAlign(editor) : "left";

  const onMouseDown = useEvent((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    setAlign(editor, {
      value: e.currentTarget.value as Alignment,
      key: KEY_ALIGN,
    });
  });

  return (
    <AlignButtons selectedAlign={selectedAlign} onMouseDown={onMouseDown} />
  );
});

export default AlignToolbarButtonGroup;
