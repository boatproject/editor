import { type PlateEditor, someNode, type Value } from "@udecode/plate-core";

/**
 * Check if selection has a node of a matching type
 */
export default function isBlockActive<V extends Value>(
  editor: PlateEditor<V>,
  type: string
) {
  return Boolean(editor?.selection) && someNode(editor, { match: { type } });
}
