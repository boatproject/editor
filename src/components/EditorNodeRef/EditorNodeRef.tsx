import { usePlateEditorRef } from "@udecode/plate";
import { forwardRef, useEffect } from "react";
import { ReactEditor } from "slate-react";
import setRef from "../../utils/setRef";

/**
 * Simple component to bind the passed ref to the editor DOM node
 */
export const EditorNodeRef = forwardRef<HTMLElement, unknown>(
  function EditorRef(_props, ref) {
    const editor = usePlateEditorRef();

    // console.log(editor);

    useEffect(() => {
      const domNode = editor ? ReactEditor.toDOMNode(editor, editor) : null;

      setRef(ref, domNode);
    }, []);

    return null;
  }
);

export default EditorNodeRef;
