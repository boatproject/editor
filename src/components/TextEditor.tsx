import { ForwardedRef, forwardRef, useMemo } from "react";
import { Plate, PlateProps } from "@udecode/plate";
import { Toolbar } from "./Toolbar";
import { createEditorPlugins } from "../plugins";
import EditorNodeRef from "./EditorNodeRef";
import { UploadImage } from "./types";

export type TextEditorProps<T = Record<string, unknown>> = Pick<
  PlateProps<T>,
  "value" | "onChange" | "initialValue" | "editableProps" | "enabled"
> & {
  id?: string;
  uploadImage?: UploadImage;
};

export const TextEditor = forwardRef(function TextEditor<
  T = Record<string, unknown>
>(props: TextEditorProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { uploadImage, ...plateProps } = props;

  const plugins = useMemo(() => createEditorPlugins<T>(), []);

  return (
    <Plate {...plateProps} plugins={plugins}>
      <EditorNodeRef ref={ref} />
      <Toolbar uploadImage={uploadImage} />
    </Plate>
  );
});

export default TextEditor;
