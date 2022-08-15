import {
  isMarkActive,
  toggleMark,
  usePlateEditorState,
} from "@udecode/plate-core";
import type { MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface MarkToolbarButtonProps extends ToolbarButtonProps {
  /**
   * Node properties to delete.
   */
  clear?: string | string[];
}

export default function MarkToolbarButton({
  selected: propSelected,
  value,
  clear,
  ...buttonProps
}: MarkToolbarButtonProps) {
  const editor = usePlateEditorState();

  const selected =
    propSelected ??
    (!!editor && Boolean(editor.selection) && isMarkActive(editor, value));

  const onMouseDown = useEvent((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    toggleMark(editor, { key: e.currentTarget.value, clear });
  });

  return (
    <ToolbarButton
      value={value}
      selected={selected}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}
