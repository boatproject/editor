import {
  getPreventDefaultHandler,
  someNode,
  toggleNodeType,
  useEventEditorId,
  useStoreEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface ToolbarElementProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export function ToolbarElement(props: ToolbarElementProps) {
  const { selected, value, inactiveType, ...buttonProps } = props;
  const editor = useStoreEditorState(useEventEditorId("focus"));

  return (
    <ToolbarButton
      value={value}
      selected={
        selected ??
        (!!editor?.selection && someNode(editor, { match: { type: value } }))
      }
      onMouseDown={
        editor &&
        getPreventDefaultHandler(toggleNodeType, editor, {
          activeType: value,
          inactiveType,
        })
      }
      {...buttonProps}
    />
  );
}

export default ToolbarElement;
