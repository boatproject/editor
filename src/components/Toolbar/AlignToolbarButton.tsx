import {
  isCollapsed,
  someNode,
  usePlateEditorState,
} from "@udecode/plate-core";
import { type Alignment, KEY_ALIGN, setAlign } from "@udecode/plate-alignment";
import ToolbarButton, { type ToolbarButtonProps } from "./ToolbarButton";
import type { MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";

export interface AlignToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value: Alignment;
  pluginKey?: string;
}

export default function AlignToolbarButton({
  value,
  pluginKey = KEY_ALIGN,
  ...buttonProps
}: AlignToolbarButtonProps) {
  const editor = usePlateEditorState();

  const selected =
    !!editor &&
    isCollapsed(editor.selection) &&
    someNode(editor, { match: { [pluginKey]: value } });

  const onMouseDown = useEvent((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    setAlign(editor, {
      value: e.currentTarget.value as Alignment,
      key: pluginKey,
    });
  });

  return (
    <ToolbarButton
      selected={selected}
      onMouseDown={onMouseDown}
      value={value}
      {...buttonProps}
    />
  );
}
