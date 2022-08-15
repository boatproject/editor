import {
  PlateEditor,
  someNode,
  toggleNodeType,
  usePlateEditorState,
  Value,
} from "@udecode/plate-core";
import type { MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";
import ToolbarButton, { type ToolbarButtonProps } from "./ToolbarButton";

/**
 * Check if selection has a node of a matching type
 */
function isBlockActive<V extends Value>(editor: PlateEditor<V>, type: string) {
  return Boolean(editor.selection) && someNode(editor, { match: { type } });
}

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export default function BlockToolbarButton({
  selected: propSelected,
  value,
  inactiveType,
  ...buttonProps
}: BlockToolbarButtonProps) {
  const editor = usePlateEditorState();

  const selected = propSelected ?? (!!editor && isBlockActive(editor, value));
  const onMouseDown = useEvent((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editor) {
      toggleNodeType(editor, {
        activeType: e.currentTarget.value,
        inactiveType,
      });
    }
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
