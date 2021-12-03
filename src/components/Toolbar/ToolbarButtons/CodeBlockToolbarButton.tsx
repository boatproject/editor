import {
  getPreventDefaultHandler,
  insertEmptyCodeBlock,
  CodeBlockInsertOptions,
  getPluginType,
  ELEMENT_CODE_BLOCK,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import { usePlateEditorState } from "../../../plate";

export interface CodeBlockToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value?: string;
  options?: CodeBlockInsertOptions;
}

export function CodeBlockToolbarButton(props: CodeBlockToolbarButtonProps) {
  const { options, ...buttonProps } = props;
  const editor = usePlateEditorState();

  return (
    <ToolbarButton
      value={getPluginType(editor, ELEMENT_CODE_BLOCK)}
      onMouseDown={getPreventDefaultHandler(insertEmptyCodeBlock, editor, {
        insertNodesOptions: { select: true },
        ...options,
      })}
      {...buttonProps}
    />
  );
}

export default CodeBlockToolbarButton;
