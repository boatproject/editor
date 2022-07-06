import { getPluginType, usePlateEditorRef } from "@udecode/plate-core";
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
  CodeBlockInsertOptions,
} from "@udecode/plate-code-block";
import { ToolbarButtonProps } from "./ToolbarButton";
import BlockToolbarButton from "./BlockToolbarButton";
import useEvent from "../../hooks/useEvent";

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

  const onMouseDown = useEvent((e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!editor) {
      return;
    }

    insertEmptyCodeBlock(editor, {
      insertNodesOptions: { select: true },
      ...options,
    });
  });

  return (
    <BlockToolbarButton
      value={editor ? getPluginType(editor, ELEMENT_CODE_BLOCK) : ""}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}
