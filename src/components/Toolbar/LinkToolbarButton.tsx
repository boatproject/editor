import {
  focusEditor,
  getPluginType,
  someNode,
  usePlateEditorState,
} from "@udecode/plate-core";
import { ELEMENT_LINK, triggerFloatingLink } from "@udecode/plate-link";
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
    event.stopPropagation();

    focusEditor(editor, editor.selection ?? editor.prevSelection ?? undefined);

    setTimeout(() => {
      triggerFloatingLink(editor, { focused: true });
    }, 0);
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
