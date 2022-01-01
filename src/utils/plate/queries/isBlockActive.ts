import { AnyObject, PlateEditor, someNode } from "@udecode/plate";

/**
 * Check if selection has a node of a matching type
 * @param editor
 * @param type
 * @returns
 */
export default function isBlockActive<T = AnyObject>(
  editor: PlateEditor<T>,
  type: string
) {
  return Boolean(editor?.selection) && someNode(editor, { match: { type } });
}
