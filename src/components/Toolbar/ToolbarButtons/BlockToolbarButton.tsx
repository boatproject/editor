import { someNode, toggleNodeType, usePlateEditorState } from "@udecode/plate";
import { useCallback, MouseEvent } from "react";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export function BlockToolbarButton(props: BlockToolbarButtonProps) {
  const { selected: propSelected, value, inactiveType, ...buttonProps } = props;
  const editor = usePlateEditorState();

  const selected =
    propSelected ??
    (!!editor?.selection && someNode(editor, { match: { type: value } }));

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
      selected={selected}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}

export default BlockToolbarButton;
