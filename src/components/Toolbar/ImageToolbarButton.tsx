import { styled } from "@mui/material";
import { usePlateEditorRef } from "@udecode/plate-core";
import { insertImage } from "@udecode/plate-image";
import { ChangeEvent } from "react";
import { useErrorHandler } from "react-error-boundary";
import useEvent from "../../hooks/useEvent";
import type { UploadImage } from "../types";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

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
export default function ImageToolbarButton({
  uploadImage,
  ...buttonProps
}: ImageToolbarButtonProps) {
  const editor = usePlateEditorRef();
  const handleError = useErrorHandler();

  const onChange = useEvent(async (e: ChangeEvent<HTMLInputElement>) => {
    if (!editor || !uploadImage) {
      return;
    }

    const file = e.target.files?.[0];

    if (file) {
      try {
        const url = await uploadImage(file);

        if (url) {
          insertImage(editor, url);
        }
      } catch (err) {
        handleError(err);
      }
    }
  });

  const inputId = "image-upload";

  return (
    <label htmlFor={inputId}>
      <Input accept="image/*" id={inputId} type="file" onChange={onChange} />
      <ToolbarButton component="span" {...buttonProps} />
    </label>
  );
}
