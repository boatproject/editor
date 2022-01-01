import { toggleNodeType, usePlateEditorState } from "@udecode/plate";
import { useCallback, MouseEvent } from "react";
import { isBlockActive } from "../../../utils";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface UseBlockProps {
  type: string;
  inactiveType?: string;
  selected?: boolean;
}

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export function BlockToolbarButton(props: BlockToolbarButtonProps) {
  const { selected: propSelected, value, inactiveType, ...buttonProps } = props;
  const editor = usePlateEditorState();

  const selected = isBlockActive(editor, value);
  const onMouseDown = useCallback(
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
      selected={propSelected ?? selected}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}

export default BlockToolbarButton;
