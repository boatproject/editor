import { Divider } from "@mui/material";
import {
  Plate,
  type AnyObject,
  type PlateEditor,
  type PlatePlugin,
  type PlateProps,
  type Value,
} from "@udecode/plate-core";
import { createPlateUI } from "@udecode/plate-ui";
import { memo } from "react";
import { type EditableProps } from "slate-react/dist/components/editable";
import { CONFIG } from "../../config";
import { createStaticPlugins } from "../../plugins";
import Toolbar from "../Toolbar";
import { type UploadImage } from "../types";

const PLUGINS = createStaticPlugins(CONFIG, createPlateUI());

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

function EditorCoreRaw<V extends Value = Value>({
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
      plugins={PLUGINS as PlatePlugin<AnyObject, V, PlateEditor<V>>[]}
      {...(CONFIG.defaultProps as Partial<PlateProps<V>>)}
      {...textEditorProps}
      {...plateProps}
    />
  );
}

const EditorCore = memo(EditorCoreRaw) as typeof EditorCoreRaw;

export default EditorCore;
