import { memo } from "react";
import { usePlateEditorState } from "@udecode/plate-core";
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
} from "../../icons";
import resolvePluginType from "../../plate-utils/resolvePluginType";
import ColorPickerToolbarButton from "./ColorPickerToolbarButton";
import MarkToolbarButton from "./MarkToolbarButton";

const MarkToolbarButtonGroup = memo(function MarkToolbarButtonGroup() {
  const editor = usePlateEditorState();

  return (
    <>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_BOLD)}
        title="Bold"
      >
        <FormatBold />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_ITALIC)}
        title="Italic"
      >
        <FormatItalic />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_UNDERLINE)}
        title="Underline"
      >
        <FormatUnderlined />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_STRIKETHROUGH)}
        title="Strikethrough"
      >
        <FormatStrikethrough />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_CODE)}
        title="Code Inline"
      >
        <Code />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_SUPERSCRIPT)}
        clear={resolvePluginType(editor, MARK_SUBSCRIPT)}
        title="Superscript"
      >
        <Superscript />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={resolvePluginType(editor, MARK_SUBSCRIPT)}
        clear={resolvePluginType(editor, MARK_SUPERSCRIPT)}
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
        value={resolvePluginType(editor, MARK_HIGHLIGHT)}
        title="Highlight"
      >
        <Highlight />
      </MarkToolbarButton>
    </>
  );
});

export default MarkToolbarButtonGroup;
