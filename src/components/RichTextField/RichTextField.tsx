import { ForwardedRef, forwardRef, ReactNode } from "react";
import { LabeledOutline } from "./LabeledOutline";
import TextEditor, { TextEditorProps } from "../TextEditor";

export interface RichTextFieldProps<T = Record<string, unknown>>
  extends TextEditorProps<T> {
  label: string;
  error?: boolean;
  helperText?: ReactNode;
}

// const StyledEditable = styled(MaterialEditable)(({ theme }) => ({
//   ...theme.typography.body1,
//   minHeight: "150px !important",
//   width: "100%",
// }));

export const RichTextField = forwardRef(function RichTextField<
  T = Record<string, unknown>
>(props: RichTextFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { label, error, helperText, ...plateProps } = props;

  return (
    <LabeledOutline
      id="rich-text-field"
      label={label}
      error={error}
      helperText={helperText}
    >
      <TextEditor {...plateProps} ref={ref} />
    </LabeledOutline>
  );
});

export default RichTextField;
