import {
  PlateEditor,
  usePlateEditorState as usePlateEditorStateBase,
  Value,
} from "@udecode/plate-core";

export default function usePlateEditorState<
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(id?: string | undefined): E {
  const editor = usePlateEditorStateBase<V, E>(id);

  if (!editor) {
    throw Error("Editor was not provided");
  }

  return editor;
}
