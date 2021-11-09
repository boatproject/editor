import {
  Alignment,
  getPreventDefaultHandler,
  isCollapsed,
  KEY_ALIGN,
  setAlign,
  someNode,
  usePlateEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface AlignToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value: Alignment;
}

export function AlignToolbarButton(props: AlignToolbarButtonProps) {
  const { value, ...buttonProps } = props;
  const editor = usePlateEditorState();

  return (
    <ToolbarButton
      selected={
        isCollapsed(editor?.selection) &&
        editor &&
        someNode(editor, { match: { [KEY_ALIGN]: value } })
      }
      onMouseDown={
        editor
          ? getPreventDefaultHandler(setAlign, editor, { value })
          : undefined
      }
      value={value}
      {...buttonProps}
    />
  );
}

export default AlignToolbarButton;
