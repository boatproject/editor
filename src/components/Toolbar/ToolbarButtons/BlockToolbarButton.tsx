import {
  getPreventDefaultHandler,
  toggleNodeType,
  usePlateEditorState,
} from "@udecode/plate";
import hasSelectionOfType from "../../plate/hasSelectionOfType";
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
      selected={selected ?? hasSelectionOfType(editor, value)}
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
