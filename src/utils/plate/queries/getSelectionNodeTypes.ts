import { getNodes, PlateEditor } from "@udecode/plate";
import { AnyObject } from "../../../types";

/**
 * Gets a list of the node types for the current selection
 * @param editor
 * @param types
 * @returns
 */
export default function getSelectionNodeTypes<T = AnyObject>(
  editor: PlateEditor<T>,
  types?: string[]
) {
  try {
    const nodeEntries = getNodes(editor, {
      match: { type: types },
    });

    const selectedTypes = [];
    for (const [node] of nodeEntries) {
      selectedTypes.push(node.type);
    }

    return selectedTypes;
  } catch (err) {
    return undefined;
  }
}
