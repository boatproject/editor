import { isMarkActive, toggleMark, usePlateEditorState } from "@udecode/plate";
import hasSelection from "../../../utils/plate/hasSelection";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import { MouseEvent } from "react";
import { useEventCallback } from "../../../hooks";

export interface MarkToolbarButtonProps extends ToolbarButtonProps {
  /**
   * Node properties to delete.
   */
  clear?: string | string[];
}

export function MarkToolbarButton(props: MarkToolbarButtonProps) {
  const { selected: propSelected, value, clear, ...buttonProps } = props;
  const editor = usePlateEditorState();

  const selected =
    propSelected ?? (hasSelection(editor) && isMarkActive(editor, value));

  const onMouseDown = useEventCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleMark(editor, { key: e.currentTarget.value, clear });
    },
    [editor, clear]
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

export default MarkToolbarButton;
