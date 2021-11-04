import {
  Alignment,
  isCollapsed,
  someNode,
  useEventEditorId,
  useStoreEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface ToolbarAlignProps extends Omit<ToolbarButtonProps, "value"> {
  align: Alignment;
}

export function ToolbarAlign(props: ToolbarAlignProps) {
  const { align, ...buttonProps } = props;
  const editor = useStoreEditorState(useEventEditorId("focus"));

  return (
    <ToolbarButton
      selected={
        isCollapsed(editor?.selection) &&
        someNode(editor!, { match: { align } })
      }
      value={align}
      {...buttonProps}
    />
  );
}

export default ToolbarAlign;
