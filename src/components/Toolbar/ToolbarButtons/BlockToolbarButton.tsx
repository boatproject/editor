import {
  getPreventDefaultHandler,
  someNode,
  toggleNodeType,
  usePlateEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import { useCallback } from "react";

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
    (e: { preventDefault: () => void }) => {
      e.preventDefault();

      toggleNodeType(editor, {
        activeType: value,
        inactiveType,
      });
    },
    [value, inactiveType, editor]
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
