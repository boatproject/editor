import { styled } from "@mui/material";
import { insertImage, usePlateEditorRef } from "@udecode/plate";
import { ChangeEvent, ForwardedRef, forwardRef, useCallback } from "react";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import type { GetImageUrl, UploadImage } from "../../types";

// const defaultGetImageUrl = () => window.prompt("Enter the URL of the image:");

const Input = styled("input")({
  display: "none",
});

export interface ImageToolbarButtonProps extends ToolbarButtonProps {
  getImageUrl?: GetImageUrl;
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

  // const handleGetImageUrl = async (e: MouseEvent<HTMLButtonElement>) => {
  //   if (!editor) {
  //     return;
  //   }

  //   e.preventDefault();

  //   let url;
  //   if (getImageUrl) {
  //     url = await getImageUrl();
  //   } else {
  //     url = defaultGetImageUrl();
  //   }

  //   if (url) {
  //     insertImage(editor, url);
  //   }
  // };

  const onChange = useCallback(
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

  return (
    <label htmlFor="image-upload">
      <Input
        accept="image/*"
        id={"image-upload"}
        type="file"
        onChange={onChange}
      />
      <ToolbarButton ref={ref} component="span" {...buttonProps} />
    </label>
  );
});

export default ImageToolbarButton;
