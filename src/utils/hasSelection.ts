import { TEditor } from "@udecode/plate-core";
import { BaseRange } from "slate";

export default function hasSelection(
  editor?: TEditor
): editor is TEditor & { selection: BaseRange } {
  return Boolean(editor?.selection);
}
