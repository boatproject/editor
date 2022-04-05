import {
  getPluginType,
  someNode,
  usePlateEditorState,
} from "@udecode/plate-core";
import { ELEMENT_LINK, getAndUpsertLink } from "@udecode/plate-link";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";
import type { GetLinkUrl } from "../types";
import useEventCallback from "../../hooks/useEventCallback";

export interface LinkToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  /**
   * Async function to get the link url
   */
  getLinkUrl?: GetLinkUrl;
}

export default function LinkToolbarButton(props: LinkToolbarButtonProps) {
  const { getLinkUrl, ...buttonProps } = props;

  const editor = usePlateEditorState();

  const type = getPluginType(editor, ELEMENT_LINK);
  const isLink = !!editor?.selection && someNode(editor, { match: { type } });

  const onMouseDown = useEventCallback(
    async (event: { preventDefault: () => void }) => {
      if (!editor) return;

      event.preventDefault();
      getAndUpsertLink(editor, getLinkUrl);
    },
    [editor, getLinkUrl]
  );

  return (
    <ToolbarButton
      value={type}
      selected={isLink}
      onMouseDown={onMouseDown}
      {...buttonProps}
    />
  );
}