import { memo } from "react";
import { CodeOff, FormatQuote, Image, Link } from "@mui/icons-material";
import { getPluginType, usePlateEditorRef } from "@udecode/plate-core";
import { ELEMENT_IMAGE } from "@udecode/plate-image";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import { BlockToolbarButton } from "../ToolbarButtons/BlockToolbarButton";
import { ImageToolbarButton } from "../ToolbarButtons/ImageToolbarButton";
import { LinkToolbarButton } from "../ToolbarButtons/LinkToolbarButton";
import { CodeBlockToolbarButton } from "../ToolbarButtons/CodeBlockToolbarButton";
import { GetLinkUrl, UploadImage } from "../../types";

export interface BlockToolbarButtonGroupProps {
  getLinkUrl?: GetLinkUrl;
  uploadImage?: UploadImage;
}

export const BlockToolbarButtonGroup = memo(function BlockToolbarButtonGroup(
  props: BlockToolbarButtonGroupProps
) {
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
});
