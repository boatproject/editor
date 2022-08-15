import {
  type TextFieldProps,
  styled,
  Stack,
  type StackProps,
  Theme,
} from "@mui/material";
import NotchedOutlineRoot from "@mui/material/OutlinedInput/NotchedOutline";
import { type ComponentPropsWithoutRef } from "react";
import classes from "./classes";

export const EditorBaseStack: (props: StackProps) => JSX.Element | null =
  styled(Stack, {
    name: "EditorBase",
    slot: "Stack",
  })(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    lineHeight: "1.4375em",
    position: "relative",
    cursor: "text",
    boxSizing: "border-box",
    width: "100%",
  }));

type ColorFieldProps = {
  color?: TextFieldProps["color"];
};
type EditorRootProps = ComponentPropsWithoutRef<"div"> & ColorFieldProps;

function getBorderColor(theme: Theme) {
  return theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.23)"
    : "rgba(255, 255, 255, 0.23)";
}

export const EditorRoot: (props: EditorRootProps) => JSX.Element | null =
  styled("div", {
    name: "Editor",
    slot: "EditorRoot",
    shouldForwardProp: (prop) => prop !== "color",
  })<ColorFieldProps>(({ theme, color = "primary" }) => {
    const borderColor = getBorderColor(theme);

    return {
      position: "relative",
      marginTop: theme.spacing(4),
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

export const NotchedOutline: typeof NotchedOutlineRoot = styled(
  NotchedOutlineRoot,
  {
    name: "Editor",
    slot: "NotchedOutline",
  }
)(({ theme }) => ({
  borderColor: getBorderColor(theme),
}));
