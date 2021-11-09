import { ForwardedRef, forwardRef } from "react";
import useEditorRefSetter from "../hooks/useEditorRefSetter";

/** Simple component to bind the passed ref to the editor DOM node */
export const EditorRef = forwardRef(function EditorRef<
  E extends HTMLElement = HTMLDivElement
>(_props: Record<string, unknown>, ref: ForwardedRef<E>) {
  useEditorRefSetter(ref);

  return null;
});

export default EditorRef;
