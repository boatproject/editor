import {
  getPreventDefaultHandler,
  someNode,
  toggleNodeType,
  usePlateEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
  inactiveType?: string;
}

export function BlockToolbarButton(props: BlockToolbarButtonProps) {
  const { selected, value, inactiveType, ...buttonProps } = props;
  const editor = usePlateEditorState();

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

export default BlockToolbarButton;
