import { ForwardedRef, forwardRef } from "react";
import { TextFieldProps } from "@mui/material";
import TextEditor, { TextEditorProps } from "../TextEditor/TextEditor";
import { AnyObject } from "../types";
import LabeledOutline from "./LabeledOutline";

type RichTextTextFieldProps = Pick<
  TextFieldProps,
  "id" | "label" | "error" | "helperText" | "color" | "required" | "name"
>;

type RichTextTextEditorProps<T = AnyObject> = Pick<
  TextEditorProps<T>,
  | "value"
  | "initialValue"
  | "onChange"
  | "editableProps"
  | "uploadImage"
  | "style"
  | "className"
  | "plateProps"
>;

export type RichTextFieldProps<T = AnyObject> = RichTextTextFieldProps &
  RichTextTextEditorProps<T>;

export const RichTextField = forwardRef(function RichTextField<T = AnyObject>(
  props: RichTextFieldProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    id,
    name,
    label,
    error,
    helperText,
    color,
    required = false,
    value,
    initialValue,
    onChange,
    editableProps,
    uploadImage,
    style,
    className,
    plateProps,
  } = props;

  return (
    <LabeledOutline
      label={label}
      htmlFor={id}
      required={required}
      color={color}
      error={error}
      helperText={helperText}
    >
      <TextEditor
        ref={ref}
        id={id}
        value={value}
        initialValue={initialValue}
        onChange={onChange}
        editableProps={{ name, ...editableProps }}
        uploadImage={uploadImage}
        style={style}
        className={className}
        plateProps={plateProps}
      />
    </LabeledOutline>
  );
});

export default RichTextField;
