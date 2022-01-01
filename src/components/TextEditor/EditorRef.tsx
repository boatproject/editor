import { usePlateEditorRef } from "@udecode/plate";
import { forwardRef, useImperativeHandle } from "react";
import { ReactEditor } from "slate-react";

export interface EditorHandleRef {
  focus: () => void;
  blur: () => void;
}

export const EditorHandle = forwardRef<EditorHandleRef>(function EditorHandle(
  _props,
  ref
) {
  const editor = usePlateEditorRef();

  // useEffect(() => {
  //   const domNode = getRootNode(editor);

  //   setRef(ref, domNode);

  //   return () => setRef(ref, null);
  // }, [ref, editor]);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => ReactEditor.focus(editor),
      blur: () => ReactEditor.blur(editor),
    }),
    [editor]
  );

  return null;
});
