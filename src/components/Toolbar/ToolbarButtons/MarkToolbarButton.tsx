import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark,
  usePlateEditorState,
} from "@udecode/plate";
import hasSelection from "../../../plate/hasSelection";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface MarkToolbarButtonProps extends ToolbarButtonProps {
  /**
   * Node properties to delete.
   */
  clear?: string | string[];
}

export function MarkToolbarButton(props: MarkToolbarButtonProps) {
  const { selected, value, clear, ...buttonProps } = props;
  const editor = usePlateEditorState();

  return (
    <ToolbarButton
      value={value}
      selected={
        selected ?? (hasSelection(editor) && isMarkActive(editor, value))
      }
      onMouseDown={
        editor
          ? getPreventDefaultHandler(toggleMark, editor, value, clear)
          : undefined
      }
      {...buttonProps}
    />
  );
}

export default MarkToolbarButton;
