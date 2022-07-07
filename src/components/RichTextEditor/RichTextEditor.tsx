import {
  FormHelperText,
  generateUtilityClasses,
  InputLabel,
  styled,
  type TextFieldProps,
  Box,
} from "@mui/material";
import NotchedOutline from "@mui/material/OutlinedInput/NotchedOutline";
import { unstable_useId as useId } from "@mui/utils";
import { type Value } from "@udecode/plate-core";
import clsx from "clsx";
import { useState, FocusEvent } from "react";
import useEvent from "../../hooks/useEvent";
import TextEditor, { type TextEditorProps } from "../TextEditor/TextEditor";

const classes = generateUtilityClasses("RichTextEditor", [
  "root",
  "colorSecondary",
  "focused",
  "disabled",
  "error",
  "notchedOutline",
]);

const Root = styled("div", {
  name: "RichTextEditor",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "color",
})<{
  color?: TextFieldProps["color"];
}>(({ theme, color = "primary" }) => {
  const borderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)";

  return {
    position: "relative",
    marginTop: "8px",
    borderRadius: theme.shape.borderRadius,
    [`&:hover .${classes.notchedOutline}`]: {
      borderColor: theme.palette.text.primary,
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${classes.notchedOutline}`]: {
        borderColor,
      },
    },
    [`&.${classes.focused} .${classes.notchedOutline}`]: {
      borderColor: theme.palette[color].main,
      borderWidth: 2,
    },
    [`&.${classes.error} .${classes.notchedOutline}`]: {
      borderColor: theme.palette.error.main,
    },
    [`&.${classes.disabled} .${classes.notchedOutline}`]: {
      borderColor: theme.palette.action.disabled,
    },
  };
});

const NotchedOutlineRoot = styled(NotchedOutline, {
  name: "RichTextEditor",
  slot: "NotchedOutline",
})(({ theme }) => ({
  borderColor:
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)",
}));

type RichTextFieldProps = Pick<
  TextFieldProps,
  "id" | "label" | "error" | "helperText" | "color" | "required" | "name"
>;

type RichTextTextEditorProps<V extends Value = Value> = Partial<
  Pick<
    TextEditorProps<V>,
    | "value"
    | "initialValue"
    | "onChange"
    | "onFocus"
    | "onBlur"
    | "editableProps"
    | "uploadImage"
    | "style"
    | "className"
    | "plateProps"
  >
>;

export type RichTextEditorProps<V extends Value = Value> = RichTextFieldProps &
  RichTextTextEditorProps<V>;

export default function RichTextEditor<V extends Value = Value>({
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
}: RichTextEditorProps<V>) {
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
    <Root
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
        <TextEditor<V>
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
      <NotchedOutlineRoot
        className={classes.notchedOutline}
        label={label && required ? `${label} *` : label}
        notched
      />
      {helperText && (
        <FormHelperText id={helperTextId} error={error} color={color}>
          {helperText}
        </FormHelperText>
      )}
    </Root>
  );
}
