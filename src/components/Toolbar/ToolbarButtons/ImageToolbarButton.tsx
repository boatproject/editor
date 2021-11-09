import { insertImage, usePlateEditorRef } from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export type GetImageUrl = () => Promise<string>;

const defaultGetImageUrl = () => window.prompt("Enter the URL of the image:");

export interface ImageToolbarButtonProps extends ToolbarButtonProps {
  getImageUrl?: GetImageUrl;
}

export function ImageToolbarButton(props: ImageToolbarButtonProps) {
  const { getImageUrl, ...buttonProps } = props;
  const editor = usePlateEditorRef();

  const handleGetImageUrl = getImageUrl ?? defaultGetImageUrl;

  return (
    <ToolbarButton
      onMouseDown={async (event) => {
        if (!editor) {
          return;
        }

        event.preventDefault();

        const url = await handleGetImageUrl();

        if (url) {
          insertImage(editor, url);
        }
      }}
      {...buttonProps}
    />
  );
}

export default ImageToolbarButton;
