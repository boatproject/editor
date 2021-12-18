import {
  InputBaseComponentProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ReactNode, TextareaHTMLAttributes } from "react";

export interface LabeledOutlineProps {
  htmlFor?: string;
  children: ReactNode;
  label: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  required?: boolean;
  color?: TextFieldProps["color"];
}

/**
 * div wrapper passed to the text field
 * @param props
 * @returns
 * @see https://stackoverflow.com/a/55036265/4272428
 * @see https://stackoverflow.com/a/58421725/4272428
 */
const InputComponent = (props: InputBaseComponentProps) => {
  const { inputRef, style, ...divProps } = props;
  return (
    <div {...(divProps as unknown as TextareaHTMLAttributes<HTMLDivElement>)} />
  );
};

export function LabeledOutline(props: LabeledOutlineProps) {
  const { htmlFor, children, label, error, helperText, required, color } =
    props;
  return (
    <TextField
      label={label}
      variant="outlined"
      InputLabelProps={{ shrink: true, htmlFor }}
      InputProps={{
        inputComponent: InputComponent,
      }}
      inputProps={{ children }}
      multiline
      error={error}
      helperText={helperText}
      required={required}
      color={color}
    />
  );
}

export default LabeledOutline;
