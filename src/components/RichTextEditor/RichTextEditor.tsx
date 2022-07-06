import {
  FormHelperText,
  generateUtilityClasses,
  InputLabel as MuiInputLabel,
  styled,
  type TextFieldProps,
} from "@mui/material";
import { unstable_useId as useId } from "@mui/utils";
import NotchedOutline from "@mui/material/OutlinedInput/NotchedOutline";
import clsx from "clsx";
import TextEditor, { type TextEditorProps } from "../TextEditor/TextEditor";
import useFocus from "./useFocus";
import type { Value } from "@udecode/plate-core";

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

const InputLabel = styled(MuiInputLabel, {
  name: "RichTextEditor",
  slot: "InputLabel",
})({
  position: "absolute",
  left: 0,
  top: 0,
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

const Content = styled("div", {
  name: "RichTextEditor",
  slot: "Content",
})({
  position: "relative",
});

type RichTextTextFieldProps = Pick<
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

export type RichTextEditorProps<V extends Value = Value> =
  RichTextTextFieldProps & RichTextTextEditorProps<V>;

export function RichTextEditor<V extends Value = Value>(
  props: RichTextEditorProps<V>
) {
  const {
    id: idOverride = "rich-text-field",
    name,
    label,
    error,
    helperText,
    color,
    required = false,
    value,
    initialValue,
    onChange,
    onFocus,
    onBlur,
    editableProps,
    uploadImage,
    style,
    className,
    plateProps,
  } = props;

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  const [focused, focusHandlers] = useFocus({ onFocus, onBlur });

  return (
    <Root
      className={clsx({
        [classes.focused]: focused,
        [classes.error]: error,
      })}
    >
      {label && (
        <InputLabel
          htmlFor={id}
          id={inputLabelId}
          variant="outlined"
          shrink
          error={error}
          color={color}
          focused={focused}
        >
          {label}
        </InputLabel>
      )}
      <Content>
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
          {...focusHandlers}
        />
      </Content>
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

export default RichTextEditor;
