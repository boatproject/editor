import { ForwardedRef, forwardRef } from "react";
import useEditorNodeRef from "../hooks/useEditorNodeRef";

/** Simple component to bind the passed ref to the editor DOM node */
export const EditorNodeRef = forwardRef(function EditorRef<
  E extends HTMLElement = HTMLDivElement
>(_props: Record<string, unknown>, ref: ForwardedRef<E>) {
  useEditorNodeRef(ref);

  return null;
});

export default EditorNodeRef;
