import {
  usePlateEditorState,
  getPlatePluginType,
  ELEMENT_LINK,
  someNode,
  getAndUpsertLink,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export type GetLinkUrl = (prevUrl?: string | null) => Promise<string | null>;

export interface LinkToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  getLinkUrl?: GetLinkUrl;
}

export function LinkToolbarButton(props: LinkToolbarButtonProps) {
  const { getLinkUrl, ...buttonProps } = props;

  const editor = usePlateEditorState();

  const type = getPlatePluginType(editor, ELEMENT_LINK);
  const isLink = !!editor?.selection && someNode(editor, { match: { type } });

  return (
    <ToolbarButton
      value={type}
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

export default LinkToolbarButton;
