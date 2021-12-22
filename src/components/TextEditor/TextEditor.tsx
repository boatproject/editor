import { forwardRef, CSSProperties, ForwardedRef, useMemo } from "react";
import { Plate, PlateProps } from "@udecode/plate";
import { Divider, Stack } from "@mui/material";
import { Toolbar } from "../Toolbar";
import { PLUGINS } from "../../plugins";
import EditorNodeRef from "../EditorNodeRef/EditorNodeRef";
import { AnyObject, UploadImage } from "../types";
import { CONFIG } from "../../config";

type PlateEditorProps<T = AnyObject> = Pick<
  PlateProps<T>,
  "initialValue" | "value" | "onChange" | "editableProps"
>;

export interface TextEditorProps<T = AnyObject> extends PlateEditorProps<T> {
  id?: string;
  name?: string;
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
    name,
    uploadImage,
    // children,
    className,
    style,
    value,
    onChange,
    initialValue,
    editableProps: propEditableProps,
    plateProps = {},
  } = props;

  const editableProps = useMemo(
    () => ({ name, ...CONFIG.editableProps, ...propEditableProps }),
    [propEditableProps, name]
  );

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
      </Plate>
    </Stack>
  );
});

export default TextEditor;
