import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
} from "@mui/icons-material";
import {
  Alignment,
  findNode,
  KEY_ALIGN,
  setAlign,
  TEditor,
  usePlateEditorState,
} from "@udecode/plate";
import { memo, MouseEvent, MouseEventHandler } from "react";
import { useEventCallback } from "../../../hooks";
import { ToolbarButton } from "../ToolbarButtons";

const DEFAULT_ALIGN = "left";

export function getAlign(editor: TEditor): Alignment {
  const nodeEntry = findNode(editor, {
    match: { [KEY_ALIGN]: ["left", "center", "right", "justify"] },
  });
  if (nodeEntry) {
    const [node] = nodeEntry;
    return node[KEY_ALIGN];
  }

  return DEFAULT_ALIGN;
}

interface AlignButtonsProps {
  onMouseDown: MouseEventHandler<HTMLButtonElement>;
  selectedAlign: Alignment;
}

const AlignButtons = memo(function AlignButtons(props: AlignButtonsProps) {
  const { selectedAlign, onMouseDown } = props;

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

export const AlignToolbarButtonGroup = memo(function AlignToolbarButtonGroup() {
  const editor = usePlateEditorState();
  const selectedAlign = getAlign(editor); // useMemo(() => , [editor]);

  const onMouseDown = useEventCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setAlign(editor, {
        value: e.currentTarget.value as Alignment,
        key: KEY_ALIGN,
      });
    },
    [editor]
  );

  return (
    <AlignButtons selectedAlign={selectedAlign} onMouseDown={onMouseDown} />
  );
});
