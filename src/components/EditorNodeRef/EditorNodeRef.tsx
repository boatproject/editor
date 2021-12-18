import { usePlateEditorState } from "@udecode/plate";
import { forwardRef, useEffect } from "react";
import { ReactEditor } from "slate-react";
import setRef from "../../utils/setRef";

/**
 * Simple component to bind the passed ref to the editor DOM node
 */
export const EditorNodeRef = forwardRef<HTMLElement, unknown>(
  function EditorRef(_props, ref) {
    const editor = usePlateEditorState();

    // console.log(editor);

    useEffect(() => {
      const domNode = editor ? ReactEditor.toDOMNode(editor, editor) : null;

      setRef(ref, domNode);
    }, [editor]);

    return null;
  }
);

export default EditorNodeRef;
