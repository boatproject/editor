import {
  useStoreEditorState,
  useEventEditorId,
  getPlatePluginType,
  ELEMENT_LINK,
  someNode,
  getAndUpsertLink,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export type GetLinkUrl = (prevUrl?: string | null) => Promise<string | null>;

export interface ToolbarLinkProps extends Omit<ToolbarButtonProps, "value"> {
  getLinkUrl?: GetLinkUrl;
}

export function ToolbarLink(props: ToolbarLinkProps) {
  const { getLinkUrl, ...buttonProps } = props;

  const editor = useStoreEditorState(useEventEditorId("focus"));

  const type = getPlatePluginType(editor, ELEMENT_LINK);
  const isLink = !!editor?.selection && someNode(editor, { match: { type } });

  return (
    <ToolbarButton
      value={ELEMENT_LINK}
      selected={isLink}
      onMouseDown={async (event) => {
        if (!editor) return;

        event.preventDefault();
        getAndUpsertLink(editor, getLinkUrl);
      }}
      {...buttonProps}
    />
  );
}

export default ToolbarLink;
