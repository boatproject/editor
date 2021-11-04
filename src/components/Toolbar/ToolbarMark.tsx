import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark,
  useEventEditorId,
  useStoreEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface ToolbarMarkProps extends ToolbarButtonProps {
  /**
   * Node properties to delete.
   */
  clear?: string | string[];
}

export function ToolbarMark(props: ToolbarMarkProps) {
  const { selected, value, clear, ...buttonProps } = props;
  const editor = useStoreEditorState(useEventEditorId("focus"));

  return (
    <ToolbarButton
      value={value}
      selected={
        selected ?? (!!editor?.selection && isMarkActive(editor, value))
      }
      onMouseDown={
        editor && getPreventDefaultHandler(toggleMark, editor, value, clear)
      }
      {...buttonProps}
    />
  );
}

export default ToolbarMark;
