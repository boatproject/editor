import { isMarkActive, TEditor } from "@udecode/plate";
import hasSelection from "./hasSelection";

export default function hasMarkSelected(
  editor: TEditor | undefined,
  type: string
) {
  return hasSelection(editor) && isMarkActive(editor, type);
}
