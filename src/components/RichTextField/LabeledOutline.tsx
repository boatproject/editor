import { InputBaseComponentProps, TextField } from "@mui/material";
import { ReactNode, TextareaHTMLAttributes } from "react";

/**
 * div wrapper passed to the text field
 * @param props
 * @returns
 * @see https://stackoverflow.com/a/55036265/4272428
 * @see https://stackoverflow.com/a/58421725/4272428
 */
const InputComponent = ({
  inputRef,
  style,
  ...props
}: InputBaseComponentProps) => (
  <div {...((props as unknown) as TextareaHTMLAttributes<HTMLDivElement>)} />
);

export interface LabeledOutlineProps {
  label?: string;
  id: string;
  children?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
}

export function LabeledOutline(props: LabeledOutlineProps) {
  const { label, id, children, error, helperText } = props;

  return (
    <TextField
      id={id}
      label={label}
      variant={"outlined"}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent,
      }}
      inputProps={{ children }}
      multiline
      error={error}
      helperText={helperText}
    />
  );
}

export default LabeledOutline;
