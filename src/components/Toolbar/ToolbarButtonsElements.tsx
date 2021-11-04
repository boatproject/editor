import {
  CheckBox,
  CodeOff,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Image,
  Link,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
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
  outdent,
  useEventEditorId,
  useStoreEditorState,
} from "@udecode/plate";
import { ToolbarButton } from "./ToolbarButton";
import { ToolbarElement } from "./ToolbarElement";
import { GetLinkUrl, ToolbarLink } from "./ToolbarLink";
import { ToolbarAlign } from "./ToolbarAlign";
import { GetImageUrl, ToolbarImage } from "./ToolbarImage";
import { ToolbarList } from "./ToolbarList";
import ToolbarButtonGroup from "./ToolbarButtonGroup";

export interface ToolbarButtonsElementsProps {
  getImageUrl?: GetImageUrl;
  getLinkUrl?: GetLinkUrl;
}

export function ToolbarButtonsElements(props: ToolbarButtonsElementsProps) {
  const { getImageUrl, getLinkUrl } = props;
  const editor = useStoreEditorState(useEventEditorId("focus"));

  return (
    <>
      <ToolbarButtonGroup size="small">
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_H1)}>
          <LooksOne />
        </ToolbarElement>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_H2)}>
          <LooksTwo />
        </ToolbarElement>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_H3)}>
          <Looks3 />
        </ToolbarElement>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_H4)}>
          <Looks4 />
        </ToolbarElement>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_H5)}>
          <Looks5 />
        </ToolbarElement>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_H6)}>
          <Looks6 />
        </ToolbarElement>
      </ToolbarButtonGroup>
      <ToolbarButtonGroup size="small">
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}>
          <FormatQuote />
        </ToolbarElement>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}>
          <CodeOff />
        </ToolbarElement>
        <ToolbarImage value={ELEMENT_IMAGE} getImageUrl={getImageUrl}>
          <Image />
        </ToolbarImage>
        <ToolbarLink getLinkUrl={getLinkUrl}>
          <Link />
        </ToolbarLink>
        <ToolbarButton
          value={"indent-"}
          onMouseDown={editor && getPreventDefaultHandler(outdent, editor)}
        >
          <FormatIndentDecrease />
        </ToolbarButton>
        <ToolbarButton
          value={"indent+"}
          onMouseDown={editor && getPreventDefaultHandler(indent, editor)}
        >
          <FormatIndentIncrease />
        </ToolbarButton>
      </ToolbarButtonGroup>
      <ToolbarButtonGroup size="small">
        <ToolbarList value={getPlatePluginType(editor, ELEMENT_UL)}>
          <FormatListBulleted />
        </ToolbarList>
        <ToolbarList value={getPlatePluginType(editor, ELEMENT_OL)}>
          <FormatListNumbered />
        </ToolbarList>
        <ToolbarElement value={getPlatePluginType(editor, ELEMENT_TODO_LI)}>
          <CheckBox />
        </ToolbarElement>
      </ToolbarButtonGroup>
      <ToolbarButtonGroup size="small">
        <ToolbarAlign align="left">
          <FormatAlignLeft />
        </ToolbarAlign>
        <ToolbarAlign align="center">
          <FormatAlignCenter />
        </ToolbarAlign>
        <ToolbarAlign align="right">
          <FormatAlignRight />
        </ToolbarAlign>
        <ToolbarAlign align="justify">
          <FormatAlignJustify />
        </ToolbarAlign>
      </ToolbarButtonGroup>
    </>
  );
}
