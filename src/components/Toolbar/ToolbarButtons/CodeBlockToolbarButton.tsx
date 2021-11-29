import {
  getPreventDefaultHandler,
  insertEmptyCodeBlock,
  usePlateEditorState,
  CodeBlockInsertOptions,
  getPluginType,
  ELEMENT_CODE_BLOCK,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface CodeBlockToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value?: string;
  options?: CodeBlockInsertOptions;
}

export function CodeBlockToolbarButton(props: CodeBlockToolbarButtonProps) {
  const { options, ...buttonProps } = props;
  const editor = usePlateEditorState();

  if (!editor) {
    return null;
  }

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
