import { generateUtilityClasses, Palette, styled } from "@mui/material";
import { TextEditorBase, TextEditorProps, TextEditorRoot } from "../TextEditor";
import { AnyObject } from "../types";

const classes = generateUtilityClasses("OutlinedTextEditor", [
  "root",
  "colorSecondary",
  "focused",
  "disabled",
  "error",
  "notchedOutline",
]);

export const OutlinedTextEditorRoot = styled(TextEditorRoot, {
  name: "OutlinedTextEditor",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: keyof Palette }>(({ theme, color = "primary" }) => {
  const borderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)";

  return {
    position: "relative",
    padding: "16.5px 14px",
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

export interface OutlinedTextEditorProps<T = AnyObject>
  extends TextEditorProps<T> {
  prop?: string; // TODO remove this
}

export function OutlinedTextEditor<T = AnyObject>(
  props: OutlinedTextEditorProps<T>
) {
  const { className, style, ...textEditorProps } = props;
  return (
    <OutlinedTextEditorRoot className={className} style={style}>
      <TextEditorBase {...textEditorProps} />
    </OutlinedTextEditorRoot>
  );
}
