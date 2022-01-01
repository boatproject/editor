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
  Subscript,
  Superscript,
} from "@mui/icons-material";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_IMAGE,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  getPluginType,
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
  usePlateEditorRef,
  usePlateEditorState,
} from "@udecode/plate";
import { AlignToolbarButton } from "./AlignToolbarButton";
import { ToolbarButton } from "./ToolbarButton";
import { ColorPickerToolbarButton } from "./ColorPickerToolbarButton";
import { BlockToolbarButton } from "./BlockToolbarButton";
import { ImageToolbarButton } from "./ImageToolbarButton";
import { LinkToolbarButton } from "./LinkToolbarButton";
import { ListToolbarButton } from "./ListToolbarButton";
import { MarkToolbarButton } from "./MarkToolbarButton";
import { CodeBlockToolbarButton } from "./CodeBlockToolbarButton";
import type { GetLinkUrl, UploadImage } from "../../types";

export function ToolbarMarkButtons() {
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

export function ToolbarIndentButtons() {
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

export function ToolbarListButtons() {
  const editor = usePlateEditorRef();

  return (
    <>
      <ListToolbarButton
        value={getPluginType(editor, ELEMENT_UL)}
        title="Bulleted List"
      >
        <FormatListBulleted />
      </ListToolbarButton>
      <ListToolbarButton
        value={getPluginType(editor, ELEMENT_OL)}
        title="Numbered List"
      >
        <FormatListNumbered />
      </ListToolbarButton>
      <BlockToolbarButton
        value={getPluginType(editor, ELEMENT_TODO_LI)}
        title="Check List"
      >
        <CheckBox />
      </BlockToolbarButton>
    </>
  );
}

export function ToolbarAlignButtons() {
  return (
    <>
      <AlignToolbarButton value="left" title="Align Left">
        <FormatAlignLeft />
      </AlignToolbarButton>
      <AlignToolbarButton value="center" title="Align Center">
        <FormatAlignCenter />
      </AlignToolbarButton>
      <AlignToolbarButton value="right" title="Align Right">
        <FormatAlignRight />
      </AlignToolbarButton>
      <AlignToolbarButton value="justify" title="Justify">
        <FormatAlignJustify />
      </AlignToolbarButton>
    </>
  );
}

export interface ToolbarBlockButtonsProps {
  getLinkUrl?: GetLinkUrl;
  uploadImage?: UploadImage;
}

export function ToolbarBlockButtons(props: ToolbarBlockButtonsProps) {
  const { getLinkUrl, uploadImage } = props;
  const editor = usePlateEditorRef();

  return (
    <>
      <BlockToolbarButton
        value={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        title="Block Quote"
      >
        <FormatQuote />
      </BlockToolbarButton>
      <CodeBlockToolbarButton
        value={getPluginType(editor, ELEMENT_CODE_BLOCK)}
        title="Code Block"
      >
        <CodeOff />
      </CodeBlockToolbarButton>
      {uploadImage && (
        <ImageToolbarButton
          value={ELEMENT_IMAGE}
          uploadImage={uploadImage}
          title="Insert Image"
        >
          <Image />
        </ImageToolbarButton>
      )}
      <LinkToolbarButton getLinkUrl={getLinkUrl} title="Insert Link">
        <Link />
      </LinkToolbarButton>
    </>
  );
}
