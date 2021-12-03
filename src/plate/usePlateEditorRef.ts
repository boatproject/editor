import {
  PlateEditor,
  usePlateEditorRef as useNullablePlateEditorRef,
} from "@udecode/plate";

/**
 * Wrap Plate Editor ref hook to assert that the editor is not nil
 * @see useNullablePlateEditorRef
 * @returns Non-nil editor
 */
export default function usePlateEditorRef<
  T = Record<string, unknown>
>(): PlateEditor<T> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useNullablePlateEditorRef<T>()!;
}
