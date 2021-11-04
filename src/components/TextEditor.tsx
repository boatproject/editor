import {
  Plate,
  PlateProps,
  SPEditor,
  WithImageUploadOptions,
} from "@udecode/plate";
import { Toolbar } from "./Toolbar";
import { CONFIG } from "../config";
import { createPlugins } from "../plugins";
import { ForwardedRef, forwardRef, useMemo, useState } from "react";
import EditorRef from "./EditorRef";
import { Box, Button, Collapse, Tooltip } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

export type TextEditorProps<T extends SPEditor = SPEditor> = Pick<
  PlateProps<T>,
  "id" | "onChange" | "initialValue"
> &
  WithImageUploadOptions & {
    defaultToolbarOpen?: boolean;
  };

export const TextEditor = forwardRef(function TextEditor<
  T extends SPEditor = SPEditor
>(props: TextEditorProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    id,
    onChange,
    initialValue,
    defaultToolbarOpen = true,
    uploadImage,
  } = props;
  const [toolbarOpen, setToolbarOpen] = useState(defaultToolbarOpen);

  const toggleToolbar = () => setToolbarOpen((prev) => !prev);

  const plugins = useMemo(() => createPlugins({ uploadImage }), [uploadImage]);

  return (
    <Plate
      id={id}
      plugins={plugins}
      components={CONFIG.components}
      options={CONFIG.options}
      onChange={onChange}
      initialValue={initialValue}
    >
      <EditorRef ref={ref} />

      <Collapse in={toolbarOpen}>
        <Toolbar />
      </Collapse>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title={`${toolbarOpen ? "Hide" : "Show"} Formatting Bar`}>
          <Button onClick={toggleToolbar} sx={{ p: 0 }} size="small">
            <MoreHoriz />
          </Button>
        </Tooltip>
      </Box>
    </Plate>
  );
});

export default TextEditor;
