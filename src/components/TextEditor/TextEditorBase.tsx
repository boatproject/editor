import { Divider } from "@mui/material";
import { AnyObject, PlateProps, Plate } from "@udecode/plate";
import { useMemo } from "react";
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
  uploadImage?: UploadImage;
  /**
   * Additional Props passed to the Plate component
   */
  plateProps?: Partial<PlateProps>;
}

export function TextEditorBaseComponent<T = AnyObject>(
  props: TextEditorBaseComponentProps<T>
) {
  const { uploadImage, plateProps = {}, children, ...componentProps } = props;

  return (
    <Plate
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
