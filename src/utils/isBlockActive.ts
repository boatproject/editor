import { AnyObject, PlateEditor, someNode } from "@udecode/plate-core";

/**
 * Check if selection has a node of a matching type
 */
export default function isBlockActive<T = AnyObject>(
  editor: PlateEditor<T>,
  type: string
) {
  return Boolean(editor?.selection) && someNode(editor, { match: { type } });
}
