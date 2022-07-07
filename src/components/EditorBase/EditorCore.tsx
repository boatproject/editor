import { Divider } from "@mui/material";
import {
  AnyObject,
  Plate,
  PlateEditor,
  PlatePlugin,
  type PlateProps,
  type Value,
} from "@udecode/plate-core";
import { type EditableProps } from "slate-react/dist/components/editable";
import { CONFIG } from "../../config";
import { PLUGINS } from "../../plugins";
import Toolbar from "../Toolbar";
import { type UploadImage } from "../types";

export type EditorCoreProps<V extends Value = Value> = Pick<
  PlateProps<V>,
  "initialValue" | "value" | "onChange" | "editableProps" | "children"
> &
  Pick<EditableProps, "onFocus" | "onBlur" | "name"> & {
    id?: string;
    /**
     * Async function to upload an image
     */
    uploadImage?: UploadImage;
    /**
     * Additional Props passed to the Plate component
     */
    plateProps?: Partial<PlateProps<V>>;
  };

export default function EditorCore<V extends Value = Value>({
  id = "main",
  name,
  editableProps,
  onFocus,
  onBlur,
  uploadImage,
  plateProps = {},
  children,
  ...textEditorProps
}: EditorCoreProps<V>) {
  return (
    <Plate<V>
      id={id}
      plugins={PLUGINS as PlatePlugin<AnyObject, V, PlateEditor<V>>[]}
      editableProps={{
        id,
        name,
        onFocus,
        onBlur,
        ...CONFIG.editableProps,
        ...editableProps,
      }}
      firstChildren={
        <>
          <Toolbar uploadImage={uploadImage} />
          <Divider />
          {children}
        </>
      }
      {...(CONFIG.defaultProps as Partial<PlateProps<V>>)}
      {...textEditorProps}
      {...plateProps}
    />
  );
}
