import { TEditor } from "@udecode/plate";
import { BaseSelection } from "slate";

export default function hasSelection(
  editor?: TEditor
): editor is TEditor & { selection: BaseSelection } {
  return Boolean(editor?.selection);
}
