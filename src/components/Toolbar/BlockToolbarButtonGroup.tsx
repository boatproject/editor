import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import { usePlateEditorRef } from "@udecode/plate-core";
import { ELEMENT_IMAGE } from "@udecode/plate-media";
import { memo } from "react";
import { CodeOff, FormatQuote, Image, Link } from "../../icons";
import resolvePluginType from "../../plate-utils/resolvePluginType";
import type { GetLinkUrl, UploadImage } from "../types";
import BlockToolbarButton from "./BlockToolbarButton";
import CodeBlockToolbarButton from "./CodeBlockToolbarButton";
import ImageToolbarButton from "./ImageToolbarButton";
import LinkToolbarButton from "./LinkToolbarButton";

export interface BlockToolbarButtonGroupProps {
  getLinkUrl?: GetLinkUrl;
  uploadImage?: UploadImage;
}

const BlockToolbarButtonGroup = memo(function BlockToolbarButtonGroup({
  getLinkUrl,
  uploadImage,
}: BlockToolbarButtonGroupProps) {
  const editor = usePlateEditorRef();

  return (
    <>
      <BlockToolbarButton
        value={resolvePluginType(editor, ELEMENT_BLOCKQUOTE)}
        title="Block Quote"
      >
        <FormatQuote />
      </BlockToolbarButton>
      <CodeBlockToolbarButton
        value={resolvePluginType(editor, ELEMENT_CODE_BLOCK)}
        title="Code Block"
      >
        <CodeOff />
      </CodeBlockToolbarButton>
      {!!uploadImage && (
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

export default BlockToolbarButtonGroup;
