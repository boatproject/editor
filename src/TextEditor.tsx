import { Box } from "@mui/material";
import { Plate, PlateProps, SPEditor } from "@udecode/plate";
import { Toolbar } from "./Toolbar";
import { CONFIG } from "./config";
import { PLUGINS } from "./plugins";

export type TextEditorProps<T extends SPEditor = SPEditor> = Pick<
  PlateProps<T>,
  "id" | "onChange" | "initialValue"
>;

export function TextEditor<T extends SPEditor = SPEditor>(
  props: TextEditorProps<T>
) {
  const { id, onChange, initialValue } = props;

  return (
    <Box>
      <Plate
        id={id}
        plugins={PLUGINS}
        components={CONFIG.components}
        options={CONFIG.options}
        onChange={onChange}
        initialValue={initialValue}
      >
        <Toolbar />
      </Plate>
    </Box>
  );
}

export default TextEditor;
