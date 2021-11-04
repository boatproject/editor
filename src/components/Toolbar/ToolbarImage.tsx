import {
  insertImage,
  useEventEditorId,
  useStoreEditorRef,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export type GetImageUrl = () => Promise<string>;

export interface ToolbarImageProps extends ToolbarButtonProps {
  getImageUrl?: GetImageUrl;
}

export function ToolbarImage(props: ToolbarImageProps) {
  const { getImageUrl, ...buttonProps } = props;
  const editor = useStoreEditorRef(useEventEditorId("focus"));

  return (
    <ToolbarButton
      onMouseDown={async (event) => {
        if (!editor) {
          return;
        }

        event.preventDefault();

        let url;
        if (getImageUrl) {
          url = await getImageUrl();
        } else {
          url = window.prompt("Enter the URL of the image:");
        }

        if (!url) {
          return;
        }

        insertImage(editor, url);
      }}
      {...buttonProps}
    />
  );
}

export default ToolbarImage;
