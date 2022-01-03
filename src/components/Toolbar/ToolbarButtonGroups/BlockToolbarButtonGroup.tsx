import { CodeOff, FormatQuote, Image, Link } from "@mui/icons-material";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_IMAGE,
  getPluginType,
  usePlateEditorRef,
} from "@udecode/plate";
import { BlockToolbarButton } from "../ToolbarButtons/BlockToolbarButton";
import { ImageToolbarButton } from "../ToolbarButtons/ImageToolbarButton";
import { LinkToolbarButton } from "../ToolbarButtons/LinkToolbarButton";
import { CodeBlockToolbarButton } from "../ToolbarButtons/CodeBlockToolbarButton";
import { GetLinkUrl, UploadImage } from "../../types";

export interface BlockToolbarButtonGroupProps {
  getLinkUrl?: GetLinkUrl;
  uploadImage?: UploadImage;
}

export function BlockToolbarButtonGroup(props: BlockToolbarButtonGroupProps) {
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
