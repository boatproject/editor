import {
  getPluginType,
  someNode,
  usePlateEditorState,
} from "@udecode/plate-core";
import { ELEMENT_LINK } from "@udecode/plate-link";
import { MouseEvent } from "react";
import type { GetLinkUrl } from "../types";
import useEvent from "../../hooks/useEvent";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface LinkToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  /**
   * Async function to get the link url
   */
  getLinkUrl?: GetLinkUrl;
}

export default function LinkToolbarButton({
  getLinkUrl,
  ...buttonProps
}: LinkToolbarButtonProps) {
  const editor = usePlateEditorState();

  const type = editor ? getPluginType(editor, ELEMENT_LINK) : ELEMENT_LINK;
  const isLink = !!editor?.selection && someNode(editor, { match: { type } });

  const onMouseDown = useEvent(async (event: MouseEvent) => {
    if (!editor) {
      return;
    }

    event.preventDefault();
    // getAndUpsertLink(editor, getLinkUrl).catch(console.error);
  });

  return (
    <ToolbarButton
      value={type}
      selected={isLink}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}
