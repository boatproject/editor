import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark,
  usePlateEditorState,
} from "@udecode/plate";
import hasSelection from "../../../plate/hasSelection";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import { useCallback } from "react";

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

  const onMouseDown = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      toggleMark(editor, { key: value, clear });
    },
    [editor, value, clear]
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
