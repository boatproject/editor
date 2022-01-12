import { toggleNodeType, usePlateEditorState } from "@udecode/plate";
import { MouseEvent } from "react";
import { useEventCallback } from "../../../hooks";
import { isBlockActive } from "../../../utils";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export function BlockToolbarButton(props: BlockToolbarButtonProps) {
  const { selected: propSelected, value, inactiveType, ...buttonProps } = props;
  const editor = usePlateEditorState();

  const selected = propSelected ?? isBlockActive(editor, value);
  const onMouseDown = useEventCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      toggleNodeType(editor, {
        activeType: e.currentTarget.value,
        inactiveType,
      });
    },
    [inactiveType, editor]
  );

  return (
    <ToolbarButton
      value={value}
      selected={selected}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}

export default BlockToolbarButton;
