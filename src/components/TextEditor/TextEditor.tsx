import { forwardRef, CSSProperties, ForwardedRef } from "react";
import { Plate, PlateProps } from "@udecode/plate";
import { Divider, Stack } from "@mui/material";
import { Toolbar } from "../Toolbar";
import { PLUGINS } from "../../plugins";
import EditorNodeRef from "../EditorNodeRef/EditorNodeRef";
import { AnyObject, UploadImage } from "../types";
import { CONFIG } from "../../config";

type PlateEditorProps<T = AnyObject> = Pick<
  PlateProps<T>,
  "initialValue" | "value" | "onChange" | "editableProps" | "children"
>;

export interface TextEditorProps<T = AnyObject> extends PlateEditorProps<T> {
  id?: string;
  uploadImage?: UploadImage;
  className?: string;
  style?: CSSProperties;
  /**
   * Additional Props passed to the Plate component
   */
  plateProps?: Partial<PlateProps>;
}

export const TextEditor = forwardRef(function TextEditor<T = AnyObject>(
  props: TextEditorProps<T>,
  ref: ForwardedRef<HTMLElement>
) {
  const {
    id,
    uploadImage,
    children,
    className,
    style,
    value,
    onChange,
    initialValue,
    editableProps: propEditableProps,
    plateProps = {},
  } = props;

  const editableProps = { ...CONFIG.editableProps, ...propEditableProps };

  return (
    <Stack className={className} style={style}>
      <Plate
        {...CONFIG.defaultProps}
        id={id}
        editableProps={editableProps}
        value={value}
        onChange={onChange}
        initialValue={initialValue}
        plugins={PLUGINS}
        {...plateProps}
      >
        <EditorNodeRef ref={ref} />
        <Toolbar uploadImage={uploadImage} />
        <Divider sx={{ mb: 2 }} />
        {children}
      </Plate>
    </Stack>
  );
});

export default TextEditor;
