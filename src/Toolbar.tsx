import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
  getPlatePluginType,
  HeadingToolbar,
  ToolbarElement,
  useEventEditorId,
  useStoreEditorRef,
  ToolbarColorPicker,
  MARK_COLOR,
  ToolbarLink,
  ToolbarImage,
  ToolbarButton,
  outdent,
  indent,
  ToolbarList,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_LIC,
  ToolbarMark,
  MARK_SUPERSCRIPT,
  MARK_SUBSCRIPT,
  MARK_BG_COLOR,
  MARK_HIGHLIGHT,
  ELEMENT_TODO_LI,
  ToolbarAlign,
} from "@udecode/plate";
import {
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatListBulleted,
  FormatListNumbered,
  CheckBox,
  Code,
  CodeOff,
  FormatQuote,
  FormatColorText,
  FormatColorFill,
  Image,
  Link,
  Subscript,
  Superscript,
  Highlight,
} from "@mui/icons-material";
import { Divider } from "@mui/material";

function ToolbarButtonsElements() {
  const editor = useStoreEditorRef(useEventEditorId("focus"));

  return (
    <>
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_H1)}
        icon={<LooksOne />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_H4)}
        icon={<Looks4 />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_H5)}
        icon={<Looks5 />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_H6)}
        icon={<Looks6 />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />
      <ToolbarElement
        type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
        icon={<CodeOff />}
      />
      <ToolbarImage icon={<Image />} />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          if (editor) {
            outdent(editor);
          }
        }}
        icon={<FormatIndentDecrease />}
      />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          if (editor) {
            indent(editor);
          }
        }}
        icon={<FormatIndentIncrease />}
      />
      <ToolbarLink icon={<Link />} />
      <ToolbarList
        type={getPlatePluginType(editor, ELEMENT_UL)}
        icon={<FormatListBulleted />}
      />
      <ToolbarList
        type={getPlatePluginType(editor, ELEMENT_OL)}
        icon={<FormatListNumbered />}
      />
      <ToolbarButton
        type={getPlatePluginType(editor, ELEMENT_TODO_LI)}
        icon={<CheckBox />}
      />
      <ToolbarAlign align="left" icon={<FormatAlignLeft />} />
      <ToolbarAlign align="center" icon={<FormatAlignCenter />} />
      <ToolbarAlign align="right" icon={<FormatAlignRight />} />
      <ToolbarAlign align="justify" icon={<FormatAlignJustify />} />
    </>
  );
}

function ToolbarButtonsMarks() {
  const editor = useStoreEditorRef(useEventEditorId("focus"));

  return (
    <>
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FormatStrikethrough />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_CODE)}
        icon={<Code />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        icon={<Superscript />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        icon={<Subscript />}
      />
      <ToolbarColorPicker pluginKey={MARK_COLOR} icon={<FormatColorText />} />
      <ToolbarColorPicker
        pluginKey={MARK_BG_COLOR}
        icon={<FormatColorFill />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_HIGHLIGHT)}
        icon={<Highlight />}
      />
    </>
  );
}

export interface ToolbarProps {
  showElements?: boolean;
  showMarks?: boolean;
}

export function Toolbar(props: ToolbarProps) {
  const { showElements = true, showMarks = true } = props;

  return (
    <HeadingToolbar>
      {showMarks && <ToolbarButtonsMarks />}
      {showElements && showMarks && <Divider orientation="vertical" />}
      {showElements && <ToolbarButtonsElements />}
    </HeadingToolbar>
  );
}

export default Toolbar;
