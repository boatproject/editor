import {
  PlateEditor,
  usePlateEditorState as useNullablePlateEditorState,
} from "@udecode/plate";

/**
 * Wrap Plate Editor State hook to assert that the editor is not nil
 * @see useNullablePlateEditorState
 * @returns Non-nil editor
 */
export default function usePlateEditorState<
  T = Record<string, unknown>
>(): PlateEditor<T> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useNullablePlateEditorState<T>()!;
}
