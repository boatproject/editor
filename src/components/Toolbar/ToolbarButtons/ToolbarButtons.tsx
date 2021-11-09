import {
  CheckBox,
  Code,
  CodeOff,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Highlight,
  Image,
  Link,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  Subscript,
  Superscript,
} from "@mui/icons-material";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  getPlatePluginType,
  getPreventDefaultHandler,
  indent,
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
  outdent,
  usePlateEditorState,
} from "@udecode/plate";
import { AlignToolbarButton } from "./AlignToolbarButton";
import { ToolbarButton } from "./ToolbarButton";
import { ColorPickerToolbarButton } from "./ColorPickerToolbarButton";
import { BlockToolbarButton } from "./BlockToolbarButton";
import { GetImageUrl, ImageToolbarButton } from "./ImageToolbarButton";
import { GetLinkUrl, LinkToolbarButton } from "./LinkToolbarButton";
import { ListToolbarButton } from "./ListToolbarButton";
import { MarkToolbarButton } from "./MarkToolbarButton";
import { CodeBlockToolbarButton } from "./CodeBlockToolbarButton";

export function ToolbarMarkButtons() {
  const editor = usePlateEditorState();

  return (
    <>
      {/* <ToolbarButtonGroup size="small"> */}
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_BOLD)}
        tooltip="Bold"
      >
        <FormatBold />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_ITALIC)}
        tooltip="Italic"
      >
        <FormatItalic />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_UNDERLINE)}
        tooltip="Underline"
      >
        <FormatUnderlined />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
        tooltip="Strikethrough"
      >
        <FormatStrikethrough />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_CODE)}
        tooltip="Code Inline"
      >
        <Code />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        tooltip="Superscript"
      >
        <Superscript />
      </MarkToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        tooltip="Subscript"
      >
        <Subscript />
      </MarkToolbarButton>
      <ColorPickerToolbarButton pluginKey={MARK_COLOR} tooltip="Font Color">
        <FormatColorText />
      </ColorPickerToolbarButton>
      <ColorPickerToolbarButton pluginKey={MARK_BG_COLOR} tooltip="Fill Color">
        <FormatColorFill />
      </ColorPickerToolbarButton>
      <MarkToolbarButton
        value={getPlatePluginType(editor, MARK_HIGHLIGHT)}
        tooltip="Highlight"
      >
        <Highlight />
      </MarkToolbarButton>
      {/* </ToolbarButtonGroup> */}
    </>
  );
}

function ToolbarHeadingButtons() {
  const editor = usePlateEditorState();

  return (
    <>
      {/* <ToolbarButtonGroup size="small"> */}
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_H1)}
        tooltip="Heading One"
      >
        <LooksOne />
      </BlockToolbarButton>
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_H2)}
        tooltip="Heading Two"
      >
        <LooksTwo />
      </BlockToolbarButton>
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_H3)}
        tooltip="Heading Three"
      >
        <Looks3 />
      </BlockToolbarButton>
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_H4)}
        tooltip="Heading Four"
      >
        <Looks4 />
      </BlockToolbarButton>
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_H5)}
        tooltip="Heading Five"
      >
        <Looks5 />
      </BlockToolbarButton>
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_H6)}
        tooltip="Heading Six"
      >
        <Looks6 />
      </BlockToolbarButton>
      {/* </ToolbarButtonGroup> */}
    </>
  );
}

function ToolbarIndentButtons() {
  const editor = usePlateEditorState();
  return (
    <>
      <ToolbarButton
        value={"indent-"}
        onMouseDown={editor && getPreventDefaultHandler(outdent, editor)}
        tooltip="Decrease Indent"
      >
        <FormatIndentDecrease />
      </ToolbarButton>
      <ToolbarButton
        value={"indent+"}
        onMouseDown={editor && getPreventDefaultHandler(indent, editor)}
        tooltip="Increase Indent"
      >
        <FormatIndentIncrease />
      </ToolbarButton>
    </>
  );
}

function ToolbarListButtons() {
  const editor = usePlateEditorState();
  return (
    <>
      {/* <ToolbarButtonGroup size="small"> */}
      <ListToolbarButton
        value={getPlatePluginType(editor, ELEMENT_UL)}
        tooltip="Bulleted List"
      >
        <FormatListBulleted />
      </ListToolbarButton>
      <ListToolbarButton
        value={getPlatePluginType(editor, ELEMENT_OL)}
        tooltip="Numbered List"
      >
        <FormatListNumbered />
      </ListToolbarButton>
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_TODO_LI)}
        tooltip="Check List"
      >
        <CheckBox />
      </BlockToolbarButton>
      {/* </ToolbarButtonGroup> */}
    </>
  );
}

function ToolbarAlignButtons() {
  return (
    <>
      {/* <ToolbarButtonGroup size="small"> */}
      <AlignToolbarButton value="left" tooltip="Align Left">
        <FormatAlignLeft />
      </AlignToolbarButton>
      <AlignToolbarButton value="center" tooltip="Align Center">
        <FormatAlignCenter />
      </AlignToolbarButton>
      <AlignToolbarButton value="right" tooltip="Align Right">
        <FormatAlignRight />
      </AlignToolbarButton>
      <AlignToolbarButton value="justify" tooltip="Justify">
        <FormatAlignJustify />
      </AlignToolbarButton>
      {/* </ToolbarButtonGroup> */}
    </>
  );
}

export interface ToolbarBlockButtonsProps {
  getImageUrl?: GetImageUrl;
  getLinkUrl?: GetLinkUrl;
}

function ToolbarBlockButtons(props: ToolbarBlockButtonsProps) {
  const { getImageUrl, getLinkUrl } = props;
  const editor = usePlateEditorState();

  return (
    <>
      {/* <ToolbarButtonGroup size="small"> */}
      <BlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
        tooltip="Block Quote"
      >
        <FormatQuote />
      </BlockToolbarButton>
      <CodeBlockToolbarButton
        value={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
        tooltip="Code Block"
      >
        <CodeOff />
      </CodeBlockToolbarButton>
      <ImageToolbarButton
        value={ELEMENT_IMAGE}
        getImageUrl={getImageUrl}
        tooltip="Insert Image"
      >
        <Image />
      </ImageToolbarButton>
      <LinkToolbarButton getLinkUrl={getLinkUrl} tooltip="Insert Image">
        <Link />
      </LinkToolbarButton>
      {/* </ToolbarButtonGroup> */}
    </>
  );
}

export type ToolbarButtonsProps = ToolbarBlockButtonsProps;

export function ToolbarButtons(props: ToolbarButtonsProps) {
  const { getImageUrl, getLinkUrl } = props;

  return (
    <>
      <ToolbarMarkButtons />
      <ToolbarHeadingButtons />
      <ToolbarBlockButtons getImageUrl={getImageUrl} getLinkUrl={getLinkUrl} />
      <ToolbarIndentButtons />
      <ToolbarListButtons />
      <ToolbarAlignButtons />
    </>
  );
}

export default ToolbarButtons;
