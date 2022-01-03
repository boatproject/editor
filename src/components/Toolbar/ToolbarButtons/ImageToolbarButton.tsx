import { styled } from "@mui/material";
import { insertImage, usePlateEditorRef } from "@udecode/plate";
import { ChangeEvent, ForwardedRef, forwardRef } from "react";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import type { UploadImage } from "../../types";
import { useEventCallback } from "../../../hooks";

const Input = styled("input")({
  display: "none",
});

export interface ImageToolbarButtonProps extends ToolbarButtonProps {
  uploadImage?: UploadImage;
}

/**
 * Button to upload an image and insert into editor
 * @todo support getImageUrl and adding image by url
 */
export const ImageToolbarButton = forwardRef(function ImageToolbarButton(
  props: ImageToolbarButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { uploadImage, ...buttonProps } = props;
  const editor = usePlateEditorRef();

  const onChange = useEventCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!editor) {
        return;
      }

      const file = e.target.files?.[0];
      if (file && uploadImage) {
        try {
          const url = await uploadImage(file);
          if (url) {
            insertImage(editor, url);
          }
        } catch (err) {
          console.error(err);
        }
      }
    },
    [editor, uploadImage]
  );

  const inputId = "image-upload";

  return (
    <label htmlFor={inputId}>
      <Input accept="image/*" id={inputId} type="file" onChange={onChange} />
      <ToolbarButton ref={ref} component="span" {...buttonProps} />
    </label>
  );
});

export default ImageToolbarButton;
