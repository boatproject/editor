import { toggleNodeType, usePlateEditorState } from "@udecode/plate-core";
import { MouseEvent } from "react";
import useEventCallback from "../../hooks/useEventCallback";
import isBlockActive from "../../utils/isBlockActive";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export default function BlockToolbarButton(props: BlockToolbarButtonProps) {
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
