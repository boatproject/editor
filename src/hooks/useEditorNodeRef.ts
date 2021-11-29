import { useEditorRef } from "@udecode/plate";
import { ForwardedRef, useEffect } from "react";
import { ReactEditor } from "slate-react";

/**
 * Hook that sets the provided ref to the underlying editor DOM node
 * @param ref Forwarded ref to set to the DOM node
 */
export function useEditorNodeRef<E extends HTMLElement = HTMLDivElement>(
  ref: ForwardedRef<E>
) {
  const editor = useEditorRef();

  useEffect(() => {
    const domNode = ReactEditor.toDOMNode(editor, editor) as E;

    if (typeof ref === "function") {
      ref(domNode);
    } else if (ref) {
      ref.current = domNode;
    }
  }, []);
}

export default useEditorNodeRef;
