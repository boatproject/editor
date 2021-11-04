import { ForwardedRef, forwardRef, useEffect } from "react";
import useEditorRefSetter from "../hooks/useEditorRefSetter";

/** Simple component to bind the passed ref to the editor DOM node */
export const EditorRef = forwardRef(function EditorRef<
  E extends HTMLElement = HTMLDivElement
>(_props: {}, ref: ForwardedRef<E>) {
  useEditorRefSetter(ref);

  return <></>;
});

export default EditorRef;
