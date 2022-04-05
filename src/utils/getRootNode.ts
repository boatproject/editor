import { PlateEditor } from "@udecode/plate-core";
import { ReactEditor } from "slate-react";

/**
 * Get a reference to the root slate node.
 * Use type parameters to assert return type.
 * @param editor
 * @returns
 */
export default function getRootNode<E extends HTMLElement = HTMLDivElement>(
  editor: PlateEditor
) {
  return ReactEditor.toDOMNode(editor, editor) as E;
}
