import { toggleNodeType, usePlateEditorState } from "@udecode/plate-core";
import type { MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";
import isBlockActive from "../../utils/isBlockActive";
import ToolbarButton, { type ToolbarButtonProps } from "./ToolbarButton";

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
