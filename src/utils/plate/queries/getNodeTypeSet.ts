import {
  EditorNodesOptions,
  getNodes,
  getQueryOptions,
  TEditor,
  TNode,
} from "@udecode/plate";
import { AnyObject } from "../../../types";

/**
 * Get a set of node types for the current selection
 * @param editor
 * @param types
 * @returns
 */
export default function getNodeTypeSet<T extends TNode = TNode>(
  editor: TEditor<AnyObject>,
  options?: EditorNodesOptions<T>
) {
  const results = new Set<string>();

  try {
    const nodeEntries = getNodes<T>(editor, {
      at: editor.selection || [],
      ...getQueryOptions(editor, options),
    });

    for (const [node] of nodeEntries) {
      results.add(node.type);
    }

    return results;
  } catch (err) {
    return results;
  }
}
