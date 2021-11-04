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
  getPlatePluginType,
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
  useEventEditorId,
  useStoreEditorState,
} from "@udecode/plate";
import { ToolbarMark } from "./ToolbarMark";
import { ToolbarColorPicker } from "./ToolbarColorPicker";
import ToolbarButtonGroup from "./ToolbarButtonGroup";

export function ToolbarButtonsMarks() {
  const editor = useStoreEditorState(useEventEditorId("focus"));

  return (
    <ToolbarButtonGroup size="small">
      <ToolbarMark value={getPlatePluginType(editor, MARK_BOLD)}>
        <FormatBold />
      </ToolbarMark>
      <ToolbarMark value={getPlatePluginType(editor, MARK_ITALIC)}>
        <FormatItalic />
      </ToolbarMark>
      <ToolbarMark value={getPlatePluginType(editor, MARK_UNDERLINE)}>
        <FormatUnderlined />
      </ToolbarMark>
      <ToolbarMark value={getPlatePluginType(editor, MARK_STRIKETHROUGH)}>
        <FormatStrikethrough />
      </ToolbarMark>
      <ToolbarMark value={getPlatePluginType(editor, MARK_CODE)}>
        <Code />
      </ToolbarMark>
      <ToolbarMark
        value={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
      >
        <Superscript />
      </ToolbarMark>
      <ToolbarMark
        value={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
      >
        <Subscript />
      </ToolbarMark>
      <ToolbarColorPicker pluginKey={MARK_COLOR} icon={<FormatColorText />} />
      <ToolbarColorPicker
        pluginKey={MARK_BG_COLOR}
        icon={<FormatColorFill />}
      />
      <ToolbarMark value={getPlatePluginType(editor, MARK_HIGHLIGHT)}>
        <Highlight />
      </ToolbarMark>
    </ToolbarButtonGroup>
  );
}
