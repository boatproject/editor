import {
  useStoreEditorState,
  useEventEditorId,
  SPEditor,
} from "@udecode/plate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

/**
 * Helper to get the current focused editor
 * @returns editor
 */
export function useFocusedEditor<
  T extends SPEditor = SPEditor & ReactEditor & HistoryEditor
>() {
  return useStoreEditorState<T>(useEventEditorId("focus"));
}

export default useFocusedEditor;
