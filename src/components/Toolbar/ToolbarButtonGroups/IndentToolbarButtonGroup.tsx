import { memo } from "react";
import {
  FormatIndentDecrease,
  FormatIndentIncrease,
} from "@mui/icons-material";
import {
  getPreventDefaultHandler,
  usePlateEditorState,
} from "@udecode/plate-core";
import { indent, outdent } from "@udecode/plate-indent";
import { ToolbarButton } from "../ToolbarButtons/ToolbarButton";

export const IndentToolbarButtonGroup = memo(
  function IndentToolbarButtonGroup() {
    const editor = usePlateEditorState();
    return (
      <>
        <ToolbarButton
          value={"indent-"}
          onMouseDown={editor && getPreventDefaultHandler(outdent, editor)}
          title="Decrease Indent"
        >
          <FormatIndentDecrease />
        </ToolbarButton>
        <ToolbarButton
          value={"indent+"}
          onMouseDown={editor && getPreventDefaultHandler(indent, editor)}
          title="Increase Indent"
        >
          <FormatIndentIncrease />
        </ToolbarButton>
      </>
    );
  }
);
