import {
  insertEmptyCodeBlock,
  CodeBlockInsertOptions,
  getPluginType,
  ELEMENT_CODE_BLOCK,
  usePlateEditorRef,
} from "@udecode/plate";
import { ToolbarButtonProps } from "./ToolbarButton";
import BlockToolbarButton from "./BlockToolbarButton";
import { useEventCallback } from "../../../hooks";

export interface CodeBlockToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value?: string;
  options?: CodeBlockInsertOptions;
}

export function CodeBlockToolbarButton(props: CodeBlockToolbarButtonProps) {
  const { options, ...buttonProps } = props;
  const editor = usePlateEditorRef();

  const onMouseDown = useEventCallback(
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
