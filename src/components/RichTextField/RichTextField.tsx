import { ForwardedRef, forwardRef } from "react";
import {
  InputBaseComponentProps,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import TextEditor, { TextEditorProps } from "../TextEditor/TextEditor";
import { EditableProps } from "slate-react/dist/components/editable";
import { AnyObject } from "../types";

const RichTextFieldRoot = styled(TextField)({
  "& .MuiInputBase-root": {
    display: "flex",
  },
});

interface RichTextInputProps<T = AnyObject> extends InputBaseComponentProps {
  editorProps?: TextEditorProps<T>;
}

const RichTextInputComponent = forwardRef(function InputComponent<
  T = AnyObject
>(props: RichTextInputProps<T>, ref: ForwardedRef<HTMLElement>) {
  const { editorProps, ...editableProps } = props;
  return (
    <TextEditor
      ref={ref}
      editableProps={editableProps as EditableProps}
      {...editorProps}
    />
  );
});

type RichTextTextFieldProps = Pick<
  TextFieldProps,
  "id" | "label" | "error" | "helperText" | "color" | "required" | "name"
>;

type RichTextTextEditorProps<T = AnyObject> = Pick<
  TextEditorProps<T>,
  "value" | "initialValue" | "onChange"
>;

export interface RichTextFieldProps<T = AnyObject>
  extends RichTextTextFieldProps,
    RichTextTextEditorProps<T> {
  /**
   * Style variant to render
   * @default "outlined"
   */
  variant?: "standard" | "outlined";
  /**
   * Additional props passed to text field component
   */
  textFieldProps?: TextFieldProps;
  /**
   * Additional props passed to TextEditor component
   */
  textEditorProps?: TextEditorProps<T>;
  /**
   * Ref passed to the TextEditor component
   */
  textEditorRef?: ForwardedRef<HTMLElement>;
}

/**
 * Material-UI TextField wrapper around TextEditor
 * @param props
 * @see https://stackoverflow.com/a/55036265/4272428
 * @see https://stackoverflow.com/a/58421725/4272428
 * @see https://github.com/mui-org/material-ui/blob/81f445cfeb4bf0c231818e80b699f3102736548c/packages/mui-material/src/OutlinedInput/OutlinedInput.js
 */
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
    variant = "outlined",
    color,
    required = false,
    value,
    initialValue,
    onChange,
    textFieldProps,
    textEditorProps,
    textEditorRef,
  } = props;

  return (
    <RichTextFieldRoot
      ref={ref}
      id={id}
      name={name}
      label={label}
      error={error}
      helperText={helperText}
      variant={variant}
      multiline
      color={color}
      required={required}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: RichTextInputComponent,
      }}
      inputProps={{
        editorProps: {
          ...textEditorProps,
          initialValue,
          onChange,
        },
      }}
      inputRef={textEditorRef}
      value={value}
      {...textFieldProps}
    />
  );
});

export default RichTextField;
