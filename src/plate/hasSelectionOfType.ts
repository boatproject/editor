import { someNode, TEditor } from "@udecode/plate";
import hasSelection from "./hasSelection";

/**
 * Does the current selection match a node of a specific type
 *
 */
export function hasSelectionOfType(editor?: TEditor, type?: string) {
  return hasSelection(editor) && someNode(editor, { match: { type } });
}

export default hasSelectionOfType;
