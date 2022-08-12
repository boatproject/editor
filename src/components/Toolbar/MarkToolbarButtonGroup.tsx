import { memo } from "react";
import {
  Code,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatStrikethrough,
  FormatUnderlined,
  Highlight,
  Subscript,
  Superscript,
} from "@mui/icons-material";
import { usePlateEditorRef } from "@udecode/plate-core";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { MARK_HIGHLIGHT } from "@udecode/plate-highlight";
import getPluginTypeOrKey from "../../plate-utils/getPluginTypeOrKey";
import ColorPickerToolbarButton from "./ColorPickerToolbarButton";
import MarkToolbarButton from "./MarkToolbarButton";

const MarkToolbarButtonGroup = memo(function MarkToolbarButtonGroup() {
  const editor = usePlateEditorRef();

  return (
    <>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_BOLD)}
        title="Bold"
      >
        <FormatBold />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_ITALIC)}
        title="Italic"
      >
        <FormatItalic />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_UNDERLINE)}
        title="Underline"
      >
        <FormatUnderlined />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_STRIKETHROUGH)}
        title="Strikethrough"
      >
        <FormatStrikethrough />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_CODE)}
        title="Code Inline"
      >
        <Code />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_SUPERSCRIPT)}
        clear={getPluginTypeOrKey(editor, MARK_SUBSCRIPT)}
        title="Superscript"
      >
        <Superscript />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_SUBSCRIPT)}
        clear={getPluginTypeOrKey(editor, MARK_SUPERSCRIPT)}
        title="Subscript"
      >
        <Subscript />
      </MarkToolbarButton>
      <ColorPickerToolbarButton pluginKey={MARK_COLOR} title="Font Color">
        <FormatColorText />
      </ColorPickerToolbarButton>
      <ColorPickerToolbarButton pluginKey={MARK_BG_COLOR} title="Fill Color">
        <FormatColorFill />
      </ColorPickerToolbarButton>
      <MarkToolbarButton
        value={getPluginTypeOrKey(editor, MARK_HIGHLIGHT)}
        title="Highlight"
      >
        <Highlight />
      </MarkToolbarButton>
    </>
  );
});

export default MarkToolbarButtonGroup;
