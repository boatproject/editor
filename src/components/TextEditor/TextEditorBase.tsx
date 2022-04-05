import { Divider } from "@mui/material";
import { AnyObject, PlateProps, Plate } from "@udecode/plate-core";
import { memo, useMemo } from "react";
import { CONFIG } from "../../config";
import { PLUGINS } from "../../plugins";
import { UploadImage } from "../types";
import { Toolbar } from "../Toolbar";
import { EditableProps } from "slate-react/dist/components/editable";

export type TextEditorPlateProps<T = AnyObject> = Pick<
  PlateProps<T>,
  "initialValue" | "value" | "onChange" | "editableProps" | "children"
>;

export interface TextEditorBaseComponentProps<T = AnyObject>
  extends TextEditorPlateProps<T> {
  id?: string;
  /**
   * Async function to upload an image
   */
  uploadImage?: UploadImage;
  /**
   * Additional Props passed to the Plate component
   */
  plateProps?: Partial<PlateProps>;
}

const TextEditorBaseComponent = memo(function TextEditorBaseComponent<
  T = AnyObject
>(props: TextEditorBaseComponentProps<T>) {
  const {
    uploadImage,
    plateProps = {},
    children,
    id = "main",
    ...componentProps
  } = props;

  return (
    <Plate
      id={id}
      {...CONFIG.defaultProps}
      plugins={PLUGINS}
      {...componentProps}
      {...plateProps}
    >
      <Toolbar uploadImage={uploadImage} />
      <Divider />
      {children}
    </Plate>
  );
});

export interface TextEditorBaseProps<T = AnyObject>
  extends TextEditorBaseComponentProps<T>,
    Pick<EditableProps, "onFocus" | "onBlur" | "name"> {}

export const TextEditorBase = memo(function TextEditorBase<T = AnyObject>(
  props: TextEditorBaseProps<T>
) {
  const {
    id,
    name,
    editableProps: propEditableProps,
    onFocus,
    onBlur,
    ...textEditorProps
  } = props;

  const editableProps = useMemo(
    () => ({
      id,
      name,
      onFocus,
      onBlur,
      ...CONFIG.editableProps,
      ...propEditableProps,
    }),
    [id, propEditableProps, name, onFocus, onBlur]
  );

  return (
    <TextEditorBaseComponent
      id={id}
      editableProps={editableProps}
      {...textEditorProps}
    />
  );
});

export default TextEditorBase;
