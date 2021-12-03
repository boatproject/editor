import {
  getPluginType,
  ELEMENT_LINK,
  someNode,
  getAndUpsertLink,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import { usePlateEditorState } from "../../../plate";
import type { GetLinkUrl } from "../../types";

export interface LinkToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  getLinkUrl?: GetLinkUrl;
}

export function LinkToolbarButton(props: LinkToolbarButtonProps) {
  const { getLinkUrl, ...buttonProps } = props;

  const editor = usePlateEditorState();

  const type = getPluginType(editor, ELEMENT_LINK);
  const isLink = !!editor?.selection && someNode(editor, { match: { type } });

  return (
    <ToolbarButton
      value={type}
      selected={isLink}
      onMouseDown={async (event: { preventDefault: () => void }) => {
        if (!editor) return;

        event.preventDefault();
        getAndUpsertLink(editor, getLinkUrl);
      }}
      {...buttonProps}
    />
  );
}

export default LinkToolbarButton;
