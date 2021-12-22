import {
  getPreventDefaultHandler,
  insertEmptyCodeBlock,
  CodeBlockInsertOptions,
  getPluginType,
  ELEMENT_CODE_BLOCK,
  usePlateEditorState,
} from "@udecode/plate";
import { ToolbarButtonProps } from "./ToolbarButton";
import BlockToolbarButton from "./BlockToolbarButton";
import { useCallback } from "react";

export interface CodeBlockToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value?: string;
  options?: CodeBlockInsertOptions;
}

export function CodeBlockToolbarButton(props: CodeBlockToolbarButtonProps) {
  const { options, ...buttonProps } = props;
  const editor = usePlateEditorState();

  const onMouseDown = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();

      insertEmptyCodeBlock(editor, {
        insertNodesOptions: { select: true },
        ...options,
      });
    },
    [editor, options]
  );

  return (
    <BlockToolbarButton
      value={getPluginType(editor, ELEMENT_CODE_BLOCK)}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}

export default CodeBlockToolbarButton;
