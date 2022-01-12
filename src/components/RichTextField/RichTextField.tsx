import {
  FormHelperText,
  generateUtilityClasses,
  InputLabel as MuiInputLabel,
  styled,
  TextFieldProps,
} from "@mui/material";
import { unstable_useId as useId } from "@mui/utils";
import NotchedOutline from "@mui/material/OutlinedInput/NotchedOutline";
import { FocusEvent, useCallback, useState } from "react";
import clsx from "clsx";

import TextEditor, { TextEditorProps } from "../TextEditor/TextEditor";
import { AnyObject } from "../../types";

const classes = generateUtilityClasses("RichTextField", [
  "root",
  "colorSecondary",
  "focused",
  "disabled",
  "error",
  "notchedOutline",
]);

const Root = styled("div", {
  name: "RichTextField",
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
  name: "RichTextField",
  slot: "InputLabel",
})({
  position: "absolute",
  left: 0,
  top: 0,
});

const NotchedOutlineRoot = styled(NotchedOutline, {
  name: "RichTextField",
  slot: "NotchedOutline",
})(({ theme }) => ({
  borderColor:
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)",
}));

const Content = styled("div", {
  name: "RichTextField",
  slot: "Content",
})({
  position: "relative",
});

type RichTextTextFieldProps = Pick<
  TextFieldProps,
  "id" | "label" | "error" | "helperText" | "color" | "required" | "name"
>;

type RichTextTextEditorProps<T = AnyObject> = Partial<
  Pick<
    TextEditorProps<T>,
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

export type RichTextFieldProps<T = AnyObject> = RichTextTextFieldProps &
  RichTextTextEditorProps<T>;

export function RichTextField<T = AnyObject>(props: RichTextFieldProps<T>) {
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

  const [focused, setFocused] = useState(false);

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      setFocused(true);

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      setFocused(false);

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

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
        <TextEditor
          id={id}
          name={name}
          value={value}
          initialValue={initialValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editableProps={editableProps}
          uploadImage={uploadImage}
          style={style}
          className={className}
          plateProps={plateProps}
        />
      </Content>
      <NotchedOutlineRoot
        className={classes.notchedOutline}
        label={
          label && required ? (
            <>
              {label}
              &nbsp;{"*"}
            </>
          ) : (
            label
          )
        }
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

export default RichTextField;
