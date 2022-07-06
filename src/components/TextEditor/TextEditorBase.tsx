import { Divider } from "@mui/material";
import {
  AnyObject,
  Plate,
  PlateEditor,
  PlatePlugin,
  type PlateProps,
  type Value,
} from "@udecode/plate-core";
import { memo, useMemo } from "react";
import { EditableProps } from "slate-react/dist/components/editable";
import { CONFIG } from "../../config";
import { PLUGINS } from "../../plugins";
import Toolbar from "../Toolbar";
import { UploadImage } from "../types";

export type TextEditorPlateProps<V extends Value = Value> = Pick<
  PlateProps<V>,
  "initialValue" | "value" | "onChange" | "editableProps" | "children"
>;

export interface TextEditorBaseComponentProps<V extends Value = Value>
  extends TextEditorPlateProps<V> {
  id?: string;
  /**
   * Async function to upload an image
   */
  uploadImage?: UploadImage;
  /**
   * Additional Props passed to the Plate component
   */
  plateProps?: Partial<PlateProps<V>>;
}

const TextEditorBaseComponent = memo(function TextEditorBaseComponent<
  V extends Value = Value
>(props: TextEditorBaseComponentProps<V>) {
  const {
    uploadImage,
    plateProps = {},
    children,
    id = "main",
    ...componentProps
  } = props;

  return (
    <Plate<V>
      id={id}
      {...(CONFIG.defaultProps as Partial<PlateProps<V>>)}
      plugins={PLUGINS as PlatePlugin<AnyObject, V, PlateEditor<V>>[]}
      {...componentProps}
      {...plateProps}
      firstChildren={
        <>
          <Toolbar uploadImage={uploadImage} />
          <Divider />
          {children}
        </>
      }
    />
  );
});

export interface TextEditorBaseProps<V extends Value = Value>
  extends TextEditorBaseComponentProps<V>,
    Pick<EditableProps, "onFocus" | "onBlur" | "name"> {}

export const TextEditorBase = memo(function TextEditorBase<
  V extends Value = Value
>(props: TextEditorBaseProps<V>) {
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
    <TextEditorBaseComponent<V>
      id={id}
      editableProps={editableProps}
      {...textEditorProps}
    />
  );
});

export default TextEditorBase;
