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
import {
  getPluginType,
  MARK_BG_COLOR,
  MARK_BOLD,
  MARK_CODE,
  MARK_COLOR,
  MARK_HIGHLIGHT,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  usePlateEditorRef,
} from "@udecode/plate";
import { ColorPickerToolbarButton } from "../ToolbarButtons/ColorPickerToolbarButton";
import { MarkToolbarButton } from "../ToolbarButtons/MarkToolbarButton";

export function MarkToolbarButtonGroup() {
  const editor = usePlateEditorRef();

  return (
    <>
      <MarkToolbarButton value={getPluginType(editor, MARK_BOLD)} title="Bold">
        <FormatBold />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginType(editor, MARK_ITALIC)}
        title="Italic"
      >
        <FormatItalic />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginType(editor, MARK_UNDERLINE)}
        title="Underline"
      >
        <FormatUnderlined />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginType(editor, MARK_STRIKETHROUGH)}
        title="Strikethrough"
      >
        <FormatStrikethrough />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginType(editor, MARK_CODE)}
        title="Code Inline"
      >
        <Code />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPluginType(editor, MARK_SUBSCRIPT)}
        title="Superscript"
      >
        <Superscript />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPluginType(editor, MARK_SUBSCRIPT)}
        clear={getPluginType(editor, MARK_SUPERSCRIPT)}
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
        value={getPluginType(editor, MARK_HIGHLIGHT)}
        title="Highlight"
      >
        <Highlight />
      </MarkToolbarButton>
    </>
  );
}
