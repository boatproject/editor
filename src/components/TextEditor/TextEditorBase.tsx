import { Divider } from "@mui/material";
import { AnyObject, PlateProps, Plate } from "@udecode/plate";
import { MutableRefObject, useMemo } from "react";
import { CONFIG } from "../../config";
import { PLUGINS } from "../../plugins";
import { UploadImage } from "../types";
import { Toolbar } from "../Toolbar";
import { EditableProps } from "slate-react/dist/components/editable";
import { EditorHandle } from "./EditorRef";

export type TextEditorPlateProps<T = AnyObject> = Pick<
  PlateProps<T>,
  "initialValue" | "value" | "onChange" | "editableProps" | "children"
>;

export interface TextEditorBaseComponentProps<T = AnyObject>
  extends TextEditorPlateProps<T> {
  id?: string;
  uploadImage?: UploadImage;
  /**
   * Additional Props passed to the Plate component
   */
  plateProps?: Partial<PlateProps>;
  editorRef?: MutableRefObject<HTMLDivElement | null>;
}

export function TextEditorBaseComponent<T = AnyObject>(
  props: TextEditorBaseComponentProps<T>
) {
  const {
    uploadImage,
    plateProps = {},
    editorRef,
    children,
    ...componentProps
  } = props;

  return (
    <Plate
      {...CONFIG.defaultProps}
      plugins={PLUGINS}
      {...componentProps}
      {...plateProps}
    >
      <EditorHandle ref={editorRef} />
      <Toolbar uploadImage={uploadImage} />
      <Divider sx={{ mb: 2 }} />
      {children}
    </Plate>
  );
}

export interface TextEditorBaseProps<T = AnyObject>
  extends TextEditorBaseComponentProps<T>,
    Pick<EditableProps, "onFocus" | "onBlur"> {
  name?: string;
}

export function TextEditorBase<T = AnyObject>(props: TextEditorBaseProps<T>) {
  const {
    name,
    editableProps: propEditableProps,
    onFocus,
    onBlur,
    ...textEditorProps
  } = props;

  const editableProps = useMemo(
    () => ({
      name,
      onFocus,
      onBlur,
      ...CONFIG.editableProps,
      ...propEditableProps,
    }),
    [propEditableProps, name, onFocus, onBlur]
  );

  return (
    <TextEditorBaseComponent
      editableProps={editableProps}
      {...textEditorProps}
    />
  );
}
