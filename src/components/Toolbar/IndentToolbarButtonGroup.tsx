import { memo, type MouseEvent } from "react";
import {
  FormatIndentDecrease,
  FormatIndentIncrease,
} from "@mui/icons-material";
import { usePlateEditorState } from "@udecode/plate-core";
import { indent, outdent } from "@udecode/plate-indent";
import useEvent from "../../hooks/useEvent";
import ToolbarButton from "./ToolbarButton";

const IndentToolbarButtonGroup = memo(function IndentToolbarButtonGroup() {
  const editor = usePlateEditorState();

  const handleOutdent = useEvent((e: MouseEvent) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    outdent(editor);
  });

  const handleIndent = useEvent((e: MouseEvent) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    indent(editor);
  });

  return (
    <>
      <ToolbarButton
        value="indent-"
        onMouseDown={handleOutdent}
        title="Decrease Indent"
      >
        <FormatIndentDecrease />
      </ToolbarButton>
      <ToolbarButton
        value="indent+"
        onMouseDown={handleIndent}
        title="Increase Indent"
      >
        <FormatIndentIncrease />
      </ToolbarButton>
    </>
  );
});

export default IndentToolbarButtonGroup;
