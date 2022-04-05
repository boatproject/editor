import { getPluginType, usePlateEditorRef } from "@udecode/plate-core";
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
  CodeBlockInsertOptions,
} from "@udecode/plate-code-block";
import { ToolbarButtonProps } from "./ToolbarButton";
import BlockToolbarButton from "./BlockToolbarButton";
import useEventCallback from "../../hooks/useEventCallback";

export interface CodeBlockToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value?: string;
  options?: CodeBlockInsertOptions;
}

export default function CodeBlockToolbarButton(
  props: CodeBlockToolbarButtonProps
) {
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
