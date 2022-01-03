import {
  getPluginType,
  ELEMENT_LINK,
  someNode,
  getAndUpsertLink,
  usePlateEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import type { GetLinkUrl } from "../../types";
import { useEventCallback } from "../../../hooks";

export interface LinkToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  /**
   * Async function to get the link url
   */
  getLinkUrl?: GetLinkUrl;
}

export function LinkToolbarButton(props: LinkToolbarButtonProps) {
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

export default LinkToolbarButton;
