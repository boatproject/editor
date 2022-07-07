import {
  FormHelperText,
  InputLabel,
  type TextFieldProps,
  Box,
} from "@mui/material";
import { unstable_useId as useId } from "@mui/utils";
import { type Value } from "@udecode/plate-core";
import clsx from "clsx";
import { useState, FocusEvent } from "react";
import useEvent from "../../hooks/useEvent";
import EditorBase, { type EditorBaseProps } from "../EditorBase/EditorBase";
import classes from "./classes";
import { EditorRoot, NotchedOutline } from "./styled";

type RichTextFieldProps = Pick<
  TextFieldProps,
  "id" | "label" | "error" | "helperText" | "color" | "required" | "name"
>;

type RichTextEditorProps<V extends Value = Value> = Partial<
  Pick<
    EditorBaseProps<V>,
    | "className"
    | "editableProps"
    | "initialValue"
    | "onBlur"
    | "onChange"
    | "onFocus"
    | "plateProps"
    | "style"
    | "uploadImage"
    | "value"
  >
>;

export type EditorProps<V extends Value = Value> = RichTextFieldProps &
  RichTextEditorProps<V>;

export default function Editor<V extends Value = Value>({
  className,
  color,
  editableProps,
  error,
  helperText,
  id: idOverride = "rich-text-field",
  initialValue,
  label,
  name,
  onBlur: propOnBlur,
  onChange,
  onFocus: propOnFocus,
  plateProps,
  required = false,
  style,
  uploadImage,
  value,
}: EditorProps<V>) {
  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  const [focused, setFocused] = useState(false);
  const onFocus = useEvent((e: FocusEvent<HTMLDivElement>) => {
    setFocused(true);
    propOnFocus?.(e);
  });
  const onBlur = useEvent((e: FocusEvent<HTMLDivElement>) => {
    setFocused(false);
    propOnBlur?.(e);
  });

  return (
    <EditorRoot
      className={clsx({
        [classes.focused]: focused,
        [classes.error]: error,
      })}
    >
      {label && (
        <InputLabel
          color={color}
          error={error}
          focused={focused}
          htmlFor={id}
          id={inputLabelId}
          shrink
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          variant="outlined"
        >
          {label}
        </InputLabel>
      )}
      <Box position="relative">
        <EditorBase<V>
          id={id}
          name={name}
          value={value}
          initialValue={initialValue}
          onChange={onChange}
          editableProps={editableProps}
          uploadImage={uploadImage}
          style={style}
          className={className}
          plateProps={plateProps}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Box>
      <NotchedOutline
        className={classes.notchedOutline}
        label={label && required ? `${label} *` : label}
        notched
      />
      {helperText && (
        <FormHelperText id={helperTextId} error={error} color={color}>
          {helperText}
        </FormHelperText>
      )}
    </EditorRoot>
  );
}
